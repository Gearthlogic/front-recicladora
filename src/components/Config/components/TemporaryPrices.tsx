import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { endLoading, startLoading } from '../../../redux/actions/loading/loading';
import { Controller, useForm } from 'react-hook-form';
import { createClientPrices, createClientTemporaryPrices, updateClientPrices } from '../../../services/api/clients';
import { Material } from '../../../constants/enums/material.enum';
import { ClientPrice } from '../../../constants/types/clientPrices.type';
import { useEffect, memo, SetStateAction, useState } from 'react';
import transalations from '../../../assets/translations.json';
import { setMessage } from '../../../redux/actions/message';

interface ClientPricesProps {
   id?: string;
   prices?: ClientPrice[]
   setPrices?: (value: ClientPrice[]) => void
}

const TemporaryPrices = ({ id, prices = [], setPrices }: ClientPricesProps) => {
   const dispatch = useDispatch();
   const { control, handleSubmit, reset } = useForm()

   const onSubmit = async (data: any) => {
      dispatch(startLoading())

      const toSend = {
         prices: Object.values(Material).map(material => ({
            material, price: parseFloat(data[material])
         }))
      };

      try {
         await createClientTemporaryPrices(toSend)
         dispatch(setMessage({ action: 'Precios establecidos correctamente.' }))
      } catch (error) {
         console.log(error)
         dispatch(setMessage({ action: 'ERROR al establecer precios.' }, 'error'))
      } finally {
         dispatch(endLoading())
      }
   };

   const buildForm = () => {
      const inputs = Object.values(Material).map(material => {

         return (
            <Grid key={material} item xs={6}>
               <Controller
                  name={material}
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                     <TextField
                        type="number"
                        label={transalations['es-ES'][material]}
                        placeholder='Precio'
                        margin='normal'
                        variant='standard'
                        {...field}
                     />
                  )}
               />
            </Grid>
         )
      });

      return (
         <Grid container>
            {inputs}
         </Grid>
      )
   }

   return (
      <Grid
         container
         justifyContent="center"
         alignItems='center'
         flexDirection='column'
      >
         <Paper
            elevation={2}
            style={{
               padding: 30,
               height: 'auto',
               width: '30%',
               minWidth: 500,
               margin: 50,
            }}
         >
            <Typography align='center' variant='h4' margin={0}>
               Precios de Materiales para Clientes Temporales
            </Typography>

            <form
               onSubmit={handleSubmit(onSubmit)}
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
               {buildForm()}
               <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  style={{ margin: '30px 0' }}
                  fullWidth
               >
                  {/* {isEditing ? 'Actualziar' : 'Crear'} Precios */}
                  Establecer Precios
               </Button>
            </form>
         </Paper>
      </Grid>
   )
}

export default memo(TemporaryPrices);
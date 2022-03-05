import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { endLoading, startLoading } from '../../../../../redux/actions/loading/loading';
import { Controller, useForm } from 'react-hook-form';
import { createClientPrices, updateClientPrices } from '../../../../../services/api/clients';
import { Material } from '../../../../../constants/enums/material.enum';
import { ClientPrice } from '../../../../../constants/types/clientPrices.type';
import { useEffect, memo, SetStateAction, useState } from 'react';
import transalations from '../../../../../assets/translations.json';

interface ClientPricesProps {
   id: string;
   prices?: ClientPrice[]
   setPrices: (value: SetStateAction<never[]>) => void
}

const ClientPrices = ({ id, prices = [], setPrices }: ClientPricesProps) => {
   const dispatch = useDispatch();
   const { control, handleSubmit, reset } = useForm()
   const [isEditing, seIsEditing] = useState(false);
   const [pricesIds, setPricesIds] = useState<{ [key in Material]?: number }>({});

   useEffect(() => {
      const isEditing = prices.length > 0;

      const materialPriceForm: { [key in Material]?: number } = {}
      const pricesIds: { [key in Material]?: number } = {};

      prices.forEach(price => {
         materialPriceForm[price.material] = price.price;
         pricesIds[price.material] = price.id;
      });

      reset(materialPriceForm);

      seIsEditing(isEditing)
      setPricesIds(pricesIds);
   }, [prices])

   async function submitCreate(data: any) {
      const toSend = {
         clientId: parseInt(id),
         prices: Object.values(Material).map(material => ({
            material, price: parseFloat(data[material])
         }))
      };

      const response = await createClientPrices(toSend);
      setPrices(response.data);
   }

   async function submitUpdate(data: any) {
      const toSend = Object.values(Material).map(material => ({
         id: pricesIds[material] || 0,
         price: parseFloat(data[material])
      }))

      await updateClientPrices(toSend);
   }

   const onSubmit = async (data: any) => {
      dispatch(startLoading())

      try {
         await (isEditing ? submitUpdate(data) : submitCreate(data));
      } catch (error) {
         console.log(error)
      } finally {
         dispatch(endLoading())
      }
   };

   function buildForm() {
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
               Precios de Materiales
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
                  {isEditing ? 'Actualziar' : 'Crear'} Precios
               </Button>
            </form>
         </Paper>
      </Grid>
   )
}

export default memo(ClientPrices);
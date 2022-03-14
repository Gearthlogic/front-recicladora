import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { endLoading, startLoading } from '../../../redux/actions/loading/loading';
import { Controller, useForm } from 'react-hook-form';
import { createClientTemporaryPrices, getTemporaryPrices } from '../../../services/api/clients';
import { Material } from '../../../constants/enums/material.enum';
import { memo, useEffect, useState } from 'react';
import transalations from '../../../assets/translations.json';
import { setMessage } from '../../../redux/actions/message';
import { objectTraps } from 'immer/dist/internal';

const TemporaryPrices = () => {
   const dispatch = useDispatch();
   const { control, handleSubmit, reset } = useForm()
   const [temporaryPrices, setTemporaryPrices] = useState<any>([])

   useEffect(() => {
      getTemporaryPrices().then(res => setTemporaryPrices(res.data))
   }, [])

   useEffect(() => {
      const resetPrices = () => {
         let auxObj = {}
         for (let i = 0; i < temporaryPrices.length; i++) {
            auxObj = {
               ...auxObj,
               [temporaryPrices[i].material]: temporaryPrices[i].price
            }
         }
         return auxObj
      }
      reset(resetPrices())
   }, [temporaryPrices])

   const onSubmit = async (data: any) => {
      // dispatch(startLoading())

      const toSend = {
         prices: Object.values(Material).map(material => ({
            material, price: parseFloat(data[material])
         }))
      };
      console.log(toSend)
      // try {
      //    await createClientTemporaryPrices(toSend)
      //    dispatch(setMessage({ action: 'Precios establecidos correctamente.' }))
      // } catch (error) {
      //    console.log(error)
      //    dispatch(setMessage({ action: 'ERROR al establecer precios.' }, 'error'))
      // } finally {
      //    dispatch(endLoading())
      // }
   };

   const buildForm = (temporaryPrices: any) => {

      const inputs = Object.values(Material).map(material => {
         const eachMaterialPrice =
            temporaryPrices
               .filter((object: any) => object.material === material)
               .map((material: any) => material.price)
         return (
            <Grid key={material} item xs={6}>
               <Controller
                  name={material}
                  control={control}
                  defaultValue={''}
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
               {buildForm(temporaryPrices)}
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
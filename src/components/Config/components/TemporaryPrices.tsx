import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../../redux/actions/loading/loading';
import { Controller, useForm } from 'react-hook-form';
import { createClientTemporaryPrices, getTemporaryPrices, upDateClientTemporaryPrices } from '../../../services/api/clients';
import { Material } from '../../../constants/enums/material.enum';
import { memo, useEffect, useState } from 'react';
import transalations from '../../../assets/translations.json';
import { setMessage } from '../../../redux/actions/message';

const TemporaryPrices = () => {
   const dispatch = useDispatch();
   const { control, handleSubmit, reset } = useForm()
   const [temporaryPrices, setTemporaryPrices] = useState<any>([])

   useEffect(() => {
      getTemporaryPrices().then(res => setTemporaryPrices(res.data))
   }, [])

   useEffect(() => {
      const pricesInputDefault = () => {
         let auxObj = {}
         for (let i = 0; i < temporaryPrices.length; i++) {
            auxObj = {
               ...auxObj,
               [temporaryPrices[i].material]: temporaryPrices[i].price,
            }
         }
         return auxObj
      }
      reset(pricesInputDefault())
   }, [temporaryPrices, reset])

   const onSubmit = async (data: any) => {
      const inputHasText = () => {
         let isText: boolean = true
         for (const key in data) {
            if (/^\d+$/.test(data[key]) || data[key] === '') {
               isText = false
            } else {
               isText = true
               break;
            }
         }
         return isText
      }

      if (!inputHasText()) {
         dispatch(startLoading())

         const isEditingPrices = () => {
            let isEditing: boolean = false
            for (let i = 0; i < temporaryPrices.length; i++) {
               if (temporaryPrices[i].price !== '' ||
                  temporaryPrices[i].price !== '0') {
                  isEditing = true
                  break;
               }
            }
            return isEditing
         }

         const editedPrices = () => {
            let editedPrices: any = []
            for (let i = 0; i < temporaryPrices.length; i++) {
               editedPrices.push({
                  id: temporaryPrices[i].id,
                  price: data[temporaryPrices[i].material]
               })
            }
            return editedPrices
         }

         const newCreatedPrices = {
            prices: Object.values(Material).map(material => ({
               material, price: parseFloat(data[material])
            }))
         };

         try {
            if (isEditingPrices()) {
               await upDateClientTemporaryPrices(editedPrices())
            } else {
               await createClientTemporaryPrices(newCreatedPrices)
            }
            dispatch(setMessage({ message: 'Precios establecidos correctamente.' }))
         } catch (error) {
            dispatch(setMessage({ message: 'ERROR - al establecer precios.' }, 'error'))
         } finally {
            dispatch(endLoading())
         }
      } else {
         dispatch(setMessage({ action: 'ERROR - Ingrese solamente Números' }, 'error'))
      }

   };

   const buildForm = (temporaryPrices: any) => {
      const inputs = Object.values(Material).map(material => {

         return (
            <Grid key={material} item xs={6}>
               <Controller
                  name={material}
                  control={control}
                  defaultValue={''}
                  render={({ field }) => (
                     <TextField
                        type="text"
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
                  Establecer Precios
               </Button>
            </form>
         </Paper>
      </Grid>
   )
}

export default memo(TemporaryPrices);
import React, { useState } from 'react'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { endLoading, startLoading } from '../../../../../redux/actions/loading/loading'
import { Controller, useForm } from 'react-hook-form';
import { createClientPrices } from '../../../../../services/api/clients'
import { Material } from '../../../../../constants/enums/material.enum'
import { ClientPrice } from '../../../../../constants/types/clientPrices.type'

interface ClientPricesProps {
   id: string;
   prices?: ClientPrice[]
}

const ClientPrices = ({id, prices} : ClientPricesProps) => {
   const dispatch = useDispatch();
   const { control, handleSubmit } = useForm()


   const onSubmit = async (data: any) => {
      dispatch(startLoading())

      const toSend = {
         clientId: parseInt(id),
         prices: Object.values(Material).map(material => ({
            material: material,
            price: data[material]
         }))
      }

      try {
         const response = await createClientPrices(toSend)
      } catch (error) {
         console.log(error)
      } finally {
         dispatch(endLoading())
      }

   };

   function buildForm() {
      return Object.values(Material).map(material => {
         return (
            <Controller
               name={material}
               control={control}
               defaultValue=''
               render={({ field }) => (
                  <TextField
                     type="number"
                     label={material}
                     placeholder='cantidad'
                     fullWidth
                     margin='normal'
                     variant='standard'
                     {...field}
                  />
               )}
            />
         )
      })
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
                  Crear Precios
               </Button>
            </form>
         </Paper>
      </Grid>
   )
}

export default ClientPrices
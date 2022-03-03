import React, { useState } from 'react'
import {  Button, Grid, Paper, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { endLoading, startLoading } from '../../../../redux/actions/loading/loading'
import { useForm } from 'react-hook-form';
import { Path } from '../../../../constants/enums/path.enum'
import { createClientPrices } from '../../../../services/api/clients'


interface FormData {
   clientId: number
   prices: [Prices]

}
interface Prices {
   price: number;
   material: string;
}

interface ParamTypes {
   id: string;
}

const ClientPrices = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const { register, handleSubmit } = useForm()
   
   const { id } = useParams<ParamTypes>();

   const [iron, setIron] = useState({ material: 'Iron', price: 0 })
   const [veneer, setVeneer] = useState({ material: 'veneer', price: 0 })


   const onChaneIron = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIron({ material: 'Iron', price: parseInt(e.target.value) })
   }
   const onChangeVeneer = (e: React.ChangeEvent<HTMLInputElement>) => {
      setVeneer({ material: 'veneer', price: parseInt(e.target.value) })
   }


   const onSubmit = async () => {
      dispatch(startLoading())
      const data = {
         clientId: parseInt(id),
         prices:[
            iron,
            veneer
         ]
      }
      
      console.log(data)

      try {
			const response = await createClientPrices(data)
			history.push(Path.editClient.replace(':id', response.data.id))
		} catch (error) {
			console.log(error)
		}
      
      dispatch(endLoading())
   };
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
               {id ? 'Precios de Materiales' : ''}
            </Typography>

            <form
               onSubmit={handleSubmit(onSubmit)}
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
               <div style={{ marginBottom: '10px' }}>
                  <label htmlFor='iron' style={{ marginRight: '20px' }}>Hierro</label>
                  <input
                     value={iron.price}
                     id='iron'
                     name='iron'
                     type='text'
                     step='0.01'
                     onChange={onChaneIron}
                     maxLength={10}
                  />
               </div>

               <div style={{ marginBottom: '10px' }}>
                  <label htmlFor='veneer' style={{ marginRight: '20px' }}>Chapa</label>
                  <input
                     value={veneer.price}
                     id='veneer'
                     name='veneer'
                     type='text'
                     onChange={onChangeVeneer}
                     maxLength={10}
                  />
               </div>

               {/* <button type='submit'>Submit</button> */}
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
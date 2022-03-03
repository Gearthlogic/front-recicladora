import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


interface FormData {
   address: {
      street: string;
      streetNumber: string
   }
}

const schema = yup
.object({
   street: yup
      .string()
      .required('Debe ingresar una Calle')
      .min(3, 'Minimo valido 3 caracteres')
      .max(50, 'Maximo valido 50 caracteres'),
   streetNumber: yup
   .string()
      .required('Debe ingresar un Número de Calle')
      .min(3, 'Minimo valido 3 caracteres')
      .max(4, 'Maximo valido 4 caracteres'),
   
})
.required();

interface ParamTypes {
   id: string;
}


const ClientAddress = () => {

   const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<FormData>({ resolver: yupResolver(schema) });

   return (
      <div>
         <h1>AdreesForm</h1>
      </div>
   )
}

export default ClientAddress
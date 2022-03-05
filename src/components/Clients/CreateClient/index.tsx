import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Path } from '../../../constants/enums/path.enum';
import { ClientType } from '../../../constants/enums/client.enum';
import { endLoading, startLoading } from '../../../redux/actions/loading/loading';
import ClientPrices from './components/ClientPrices/ClientPrices';
import { ClientPrice } from '../../../constants/types/clientPrices.type';
import translations from '../../../assets/translations.json';
import {
	getClientDetails,
	updateClient,
	createNewClient
} from '../../../services/api/clients';
import { RootStore } from '../../../redux';
import { Role } from '../../../constants/enums/role.enum';

interface FormData {
	alias: string;
	firstname: string;
	lastname: string;
	street?: string;
	streetNumber?: string;
	email: string;
	cellphone: string;
	type: ClientType;
	prices?: ClientPrice[]
}

const phoneRegExp =
	/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
const onlyNumbers = /^\d+$/

const schema = yup
	.object({
		alias: yup
			.string()
			.required('Debe ingresar un Alias')
			.min(3, 'Minimo valido 3 caracteres')
			.max(25, 'Maximo valido 25 caracteres'),
		firstname: yup
			.string()
			.required('Debe ingresar un Nombre')
			.min(3, 'Minimo valido 3 caracteres')
			.max(25, 'Maximo valido 25 caracteres'),
		lastname: yup
			.string()
			.required('Debe ingresar un Apellido')
			.min(3, 'Minimo valido 3 caracteres')
			.max(25, 'Maximo valido 25 caracteres'),
		street: yup
			.string()
			.required('Debe ingresar una Calle')
			.min(3, 'Minimo valido 3 caracteres')
			.max(50, 'Maximo valido 50 caracteres'),
		streetNumber: yup
			.string()
			.matches(onlyNumbers)
			.required('Debe ingresar la Altura')
			.min(1, 'Minimo valido 1 caracteres')
			.max(5, 'Maximo valido 5 caracteres'),
		email: yup
			.string()
			.email('Debe ser un email valido')
			.required('Debe ingresar un Email'),
		cellphone: yup
			.string()
			.matches(phoneRegExp)
			.required('Debe ingresar un telefono'),
		type: yup.string().required('Debe ingresar un Tipo de Cliente'),
	})
	.required();

interface ParamTypes {
	id: string;
}

const CreateClient = () => {
	const dispatch = useDispatch()
	const history = useHistory();
	const {loading, user} = useSelector((state: RootStore) => ({
		user: state.auth.user,
		loading: state.loader.loading
	}))
	const { id } = useParams<ParamTypes>();

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		getValues
	} = useForm<FormData>({ resolver: yupResolver(schema) });

	useEffect(() => {
		if (id) {
			getClientDetails(id).then((res) => {
				const formData = { ...res.data, ...res.data.address };
				delete formData.address;
				reset(formData)
			});
		}
	}, [id, reset]);

	const onSubmitCreate: SubmitHandler<FormData> = async data => {
		dispatch(startLoading())

		const newBody = {
			...data,
			address: {
				street: data.street,
				streetNumber: data.streetNumber
			}
		}
		delete newBody.street
		delete newBody.streetNumber

		try {
			const response = await createNewClient(newBody)

			history.push(Path.editClient.replace(':id', response.data.id))
		} catch (error) {
			console.log(error)
		}

		dispatch(endLoading())
	};

	const onSubmitEdit = async (data: any) => {
		dispatch(startLoading())

		const newBody = {
			alias: data.alias,
			firstname: data.firstname,
			lastname: data.lastname,
			address: {
				id: data.id,
				street: data.street,
				streetNumber: data.streetNumber
			},
			email: data.email,
			cellphone: data.cellphone,
			type: data.type,
			id: parseInt(id)
		}

		try {
			await updateClient(newBody)
		} catch (error) { }
		finally {
			dispatch(endLoading())
		}

	};

	function clientPricesAllowed() {
		const isEditing = !!id;
		const isPermanentClient = getValues().type === ClientType.Permanent;
		const isAuthorizedUser = user?.roles.some(role => role === Role.Admin);
		const notLoading = !loading;

		return notLoading && isEditing && isPermanentClient && isAuthorizedUser;
	}

	return (
		<Grid container alignItems='center' flexDirection='column'>
			<Paper
				elevation={2}
				style={{
					padding: 30,
					height: 'auto',
					width: '30%',
					minWidth: 500,
				}}
			>
				<Typography align='center' variant='h4' margin={0}>
					{id ? 'Editar Cliente' : 'Alta de Cliente'}
				</Typography>

				<form
					onSubmit={handleSubmit(id ? onSubmitEdit : onSubmitCreate)}
				>
					<Controller
						name='alias'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<TextField
								label={id ? '' : 'Alias'}
								placeholder='Ingrese Alias de Cliente'
								fullWidth
								margin='normal'
								{...field}
								variant='standard'
							/>
						)}
					/>
					{errors.alias && (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							{errors.alias.message}
						</Typography>
					)}
					<Controller
						name='firstname'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<TextField
								label={id ? '' : 'Nombre'}
								placeholder='Ingrese Nombre de Cliente'
								fullWidth
								margin='normal'
								{...field}
								variant='standard'
							/>
						)}
					/>
					{errors.firstname && (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							{errors.firstname.message}
						</Typography>
					)}
					<Controller
						name='lastname'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<TextField
								label={id ? '' : 'Apellido'}
								placeholder='Ingrese Apellido de Cliente'
								fullWidth
								margin='normal'
								{...field}
								variant='standard'
							/>
						)}
					/>
					{errors.lastname && (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							{errors.lastname.message}
						</Typography>
					)}
					<Controller
						name={'street'}
						control={control}
						defaultValue=''
						render={({ field }) => (
							<TextField
								label={id ? '' : 'Calle'}
								placeholder='Ingrese la Calle del Cliente'
								fullWidth
								margin='normal'
								{...field}
								variant='standard'
							/>
						)}
					/>
					{errors.street && (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							{errors.street.message}

						</Typography>
					)}
					<Controller
						name='streetNumber'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<TextField
								label={id ? '' : 'Altura'}
								placeholder='Ingrese la Altura'
								fullWidth
								margin='normal'
								{...field}
								variant='standard'
							/>
						)}
					/>
					{errors.streetNumber && (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							{errors.streetNumber.message}
						</Typography>
					)}
					<Controller
						name='email'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<TextField
								label={id ? '' : 'Email'}
								placeholder='Ingrese Email de Cliente'
								fullWidth
								margin='normal'
								{...field}
								variant='standard'
							/>
						)}
					/>
					{errors.email && (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							{errors.email.message}
						</Typography>
					)}
					<Controller
						name='cellphone'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<TextField
								label={id ? '' : 'Telefono'}
								placeholder='Ingrese Telefono de Cliente'
								fullWidth
								margin='normal'
								{...field}
								variant='standard'
							/>
						)}
					/>
					{errors.cellphone && (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							{errors.cellphone.message}
						</Typography>
					)}
					<FormControl variant='standard' sx={{ mt: 2, minWidth: 150 }}>
						<InputLabel id='demo-simple-select-standard-label'>
							Tipo de Cliente
						</InputLabel>
						<Controller
							name='type'
							control={control}
							defaultValue={ClientType.Permanent}
							render={({ field }) => {
								return (
									<Select
										fullWidth
										labelId='demo-simple-select-standard-label'
										id='demo-simple-select-standard'
										label='Tipo de Cliente'
										{...field}
									>
										{Object.values(ClientType).map((type, i) => (
											<MenuItem value={type} key={i}>
												{translations['es-ES'][type]}
											</MenuItem>
										))}
									</Select>
								)
							}}
						/>
						{errors.type && (
							<Typography
								variant='subtitle2'
								style={{ color: 'red' }}
							>
								{errors.type.message}
							</Typography>
						)}
					</FormControl>

					<Button
						type='submit'
						color='primary'
						variant='contained'
						style={{ margin: '30px 0' }}
						fullWidth
					>
						{id ? 'Actualizar' : 'Guardar'}
					</Button>
				</form>
			</Paper>
			{clientPricesAllowed() &&
				<ClientPrices
					id={id}
					prices={getValues().prices}
					setPrices={prices => reset({ prices })}
				/>
			}
		</Grid>
	);
};

export default CreateClient;

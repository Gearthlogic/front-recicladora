# React Typescript Gearthlogic Docs

En este proyecto y documentacion definiremos las  practicas y patrones a utilizar en los proyectos que afrontara la empresa, para mantener una base de codigo consistente y limpia.  


# Estructura

La estructura de las aplicaciones es muy importante a la hora de mantener y ayudar a que un nuevo developer entre en un proyecto sin estar horas revisando donde esta cada elemento, por esto se definen las siguientes reglas para crear la estructura de carpetas y archivos adentro del *src*

    |-assets
	|   |-fonts
	|       |-SansSerif.tts	
	|   |-images
	|   	|-appLogo.png
	|-components
	|	|-App
	|	|	|-App.test.tsx
	|	|	|-index.tsx
	|	|-ClientFolder
	|	|	|-Clients
	|	|	|	|-index.tsx
	|	|	|	|-Clients.test.tsx
	|	|	|	|-styles.css
	|	|	|-ClientInfo
	|	|	|	|-index.tsx
	|	|	|	|-styles.css
	|	|	|-ClientHistory
	|	|	|	|-index.tsx
	|	|	|	|-styles.css
	|-sharedComponetns
	|	|-Button
	|	|	|-index.tsx
	|	|	|-styles.css
	|-hooks
	|	|-useFetch
	|	|	|-index.ts   
	|	|	|-reducer.ts
	|-redux
	|	|-actions
	|	|	|-index.ts
	|	|	|-clients.ts
	|	|-reducers
	|	|	|-index.ts
	|	|	|-clients.ts
	|	|-types
	|	|	|-index.ts
	|	|	|-clients.ts
	|-routes
	|	|-paths.ts
	|	|-roles.ts
	|	|-index.ts
	|-services
	|	|-api
	|	|	|-clients.ts
	|	|-toast.ts
	|-utils
	|	|-dates.ts
	|-index.tsx
### **Desgloce:**
**assets:** 
Aqui iran todos archivos que normalmente podrian ser de "media" ( imagenes, fuentes, gifs, svg, etc )  

**components:** 
Aqui iran todos los componentes que son referidos a pantallas de la aplicacion, seguidos por "*Folder*"  y adentro de este directorio iran los componentes que son usados solamente por esta pantalla .Por ejemplo, si tenemos la pantalla home en nuestra app:

   	|-components
	|	|-HomeFolder
	|	|	|-Home
	|	|	|	|-index.tsx
	|	|	|	|-Home.test.tsx
	|	|	|	|-styles.css
	|	|	|-HomeChat
	|	|	|	|-index.tsx
	|	|	|	|-styles.css
	

**sharedComponents:** 
Aqui van todos los componentes que seran utilizados por varias pantallas de la aplicacion o que se estiman que pueden ser de utilidad para el futuro en otros lugares de la app.
La forma de estructura sera igual que en componentes exeptuando la agrupacion por pantalla.

**hooks:** 
Aqui iran los hooks que se usaran en la aplicacion, pueden ir agrupados por carpeta en caso de que el hook requiera mas de un archivo o simplemente el archivo del hook en lowerCamelCase.
 
**redux:** 
Aqui ira toda la logica relacionada con redux.
Estara separado en 3 carpetas que contendran los aspectos separados de redux:


> actions, reducers y types

En los 3 directorios tendran un archivo index, en el caso de actions y types haran 

    export * from './file'
de los archivos contenidos en los directorios
y en la carpeta reducer el archivo index combinara los reducers contenidos en los directorios.

**routes:** 
Aqui iran definida toda la logica relacionada con las rutas, perfiles y movimiento de pantallas de la aplicacion. Hay reglas comunes que son extrapolables a todas las aplicaciones que seran explicadas mas adelante.

**services:** 
Aqui iran todos los servicios utilizados por la aplicacion, los mas comunes son: apis, toasts, notifications, etc.

**utils:**
Aqui iran todas aquellas funciones que se pueden usar en toda la aplicacion que sean de utilidad, ejemplos funciones de conversion de fechas,  formateo de texto, etc.

### **Reglas:**
**Directorios:** 
lowerCamelCase siempre que no contengan componentes, en ese caso seran  UpperCamelCase,
Los componentes siempre estaran contenidos en carpetas, con un index el cual exportara por default el componente principal. Los subcomponentes deben ir en carpetas al igual que sus padres.
Los estilos deben ir en la misma carpeta del componente al igual que los archivos de test y archivos adicionales que el componente necesite pero que no se compartan mas alla de sus subcarpetas. En tal caso esas dependencias deberan recaer en alguna de los otros directorios principales.

**Archivos:**
Componentes: 
Debe finalizar con .tsx en vez de .ts o (jsx en vez de js) esto define que nuestro archivo contiene codigo react.
UpperCamelCase solo en el caso de que por algun motivo no se encuentre contenido en un directorio el cual tendra UpperCamelCase, sino sera un archivo index.tsx.

Otros archivos ts: 
lowerCamelCase, mantener nombres cortos pero descriptivos.

Otros archivos: 
Usar la practica correspondiente de nombres para cada tipo de archivo.


# Guia para escribir react
Siempre se puede mejorar la calidad de nuestro codigo, y para eso hay reglas que deberiamos seguir para conseguir un codigo homogeneo independientemente de trabaje en cualquier proyecto que se presente.

### Mantener los componentes lo mas chico posible
La idea es bastante simple, cada componente deberia ocuparse de 1 sola tarea, aunque sea tedioso al principio, a la hora de mantener la aplicacion ahorrara horas de debugs y dolores de cabeza.
Los componentes como **maximo** deberian tener 150 lineas. si estamos hablando de un componente que realiza muchas tareas, o tiene bastante logica, la cual deberiamos buscar formas de reducir a toda costa.
Para lograr esto deberiamos: 

 1. Crear componentes hijos intentando separar cada pequeña parte del componente.
 2. Sacar informacion y logica del componente, creando custom hooks, armando funciones fuera del archivo del componente.
 3. Usar destructuring, y shorthandlers de javascript moderno para ahorrar codigo y hacerlo mas legible, arrow functions.
 4. Pasar logica tambien como acciones globales, o como servicios aplicados desde otro lugar de la aplicacion.

 ### Pensar en reusabilidad
 Al igual que en el punto de arriba, puede ser tedioso al principio pero puede ahorrar mucho a futuro cuando no solo hacemos los componentes funcionales a lo que nos piden hoy en el ticket, sino pensar si lo que estamos haciendo puede hacerse reusable de alguna forma, sea tanto sacando la logica del componente, creando algo que sea en su base generico, y luego creando arriba de esa base el componente deseado, asi la base se puede reutilizar.
 
 NO TE REPITAS!
 
 ### Eliminar div innecesarios
 En vez de esto: 
 

    return(
	    <div>
		    <li>Content</li>
	    </div>
    );

Esto: 

    return(
	    <li>Content</li>
    );
O si no es posible ya que contiene 2+ elementos y react nos tira error, podemos usar un fragment:

    return(
	    <>
		    <li>Content</li>
		    <li>Content</li>
		    <li>Content</li>
	    </>
    );

 ### Eliminar comentarios y console.log antes de los commits
 Es importante depurar nuestro codigo antes de hacer un commit, cuando dejamos codigo comentado debe tener un buen motivo por lo cual ese codigo esta asi, de otra forma solo usa espacio y se hace mas dificil de entender. Lo mismo que los console log, que ademas de lo anterior, es un peligro de seguridad y queda poco profesional. No debe quedar ningun console.log en los commits.
 
 ### Usar buenos comentarios
 Los comentarios solo deberian usarse para explicar una funcion compleja y/o que puede llegar a ser dificil de entender por solo el nombre, es decir, una funcion deberia poder explicarse sola por el nombre, no importa que sea un poco largo. Ejemplo una funcion que obtiene todos productos de una coleccion dada el id de la collecion:
 

    getProductsFromCollectionByID(collectionID: string)

 Y en caso que tengamos una funcion que hace algo complejo de explicar o muy largo, en ese caso podemos usar un comentario para la funcion.
 Otro caso en el que podemos usar comentarios es para separar el codigo, por ejemplo si tenemos un componente que tiene estado, y handlers podemos hacer un comentario //State y //Handlers

  ### No usar el index como key en un map al renderizar un componente
  Esto puede provocar bugs a la hora de renderizar, en vez de esto, intentar utilizar propiedades del elemento a mapear o como ultimo recurso, si no hay ningun valor que no se repita entre nuestro arreglo, usar *nanoid* https://github.com/ai/nanoid/
  
  ### No crear 2+ componentes en el mismo archivo
  A veces es tentador al crear un componente que esta muy relacionado con otro, en el mismo archivo, mas cuando son compones no tan grandes. Pero esto es una muy mala practica ya que dificulta la lectura del archivo.  Igual que con por ejemplo una constante con data dummy, etc, tratemos de enviarlas a archivos aparte.
  
 ### Usar bien los operadores ternarios y renderizado condicional en react

Cuando tenemos un componente que debemos renderizar condicionalmente, podemos usar el operador and poniendo el componente en segunda posicion, ya que JavaScript cuando lee un operador and, si la primera parte es falsa no leera la segunda parte. Ejemplo:
En vez de:

    return loginAttempts < maxAttempts ? <Componente/> : null

Debemos hacer:

    return loginAttempts < maxAttempts && <Componente/>

Queda muy elegante, pero hay que evitar anidar tanto los operadores ternarios como los condicionales sin if ya que pueden convertirse en una maraña imposible de seguir muy rapido, si es posible tratar de no anidar en ninguna situacion.

 ### Evitar estilos en linea
A menos que no haya otra forma viable de estilar los componentes, no deberiamos nunca usar  estilos en linea en el metodo render, ya que se vuelven imposible de mantener los proyectos grandes.

 ### Evitar usar varias librerias de estilos / componentes
 Lo ideal es no usar ninguna libreria.
 No deberia haber mas de 2 librerias de estilos en el mismo proyecto, si es posible dejarlo en 1 e intentar crear nuestros propios estilos, ya que termina siendo mas complicado entender los estilos que la logica del programa.

### Evitar funciones anonimas
Mientras que las funciones anonimas son una buena forma de pasar una function prop (especialmente las que necesitan ser invocadas con otra prop como parametro), estas obtienen una referencia distinta en cada render. Al igual que los estilos en linea mencionados arriba. Para mantener la misma referencia a una funcion que pasas como prop podes declararla como un metodo de clase (si es un componente clase) o utilizar el hook `useCallback` si es un componente funcional.
A veces se necesita una referencia diferente por cada set de parametro con las cuales se invoca la funcion ejemplo una funcion calculada adentro de un .map, se puede utilizar memorize functions como lodash’s memoize  https://lodash.com/docs/4.17.11#memoize
Que seria "function catching" y nos ayuda a tener una referencia fija en un numero dinamico de funciones anonimas al costo de memoria del navegador.
 Obviamente hay veces en las que las funciones inline son la forma mas facil y no causan un problema de performance. Puede ser por que o estamos en un componente muy liviano o por que el componente padre necesita hacer  re-render de todo su contenido cada vez que cambia sus props (o no te importa ya que igualmente se va a re-rendizar). 
Una ultima cosa para remarcar es que por default las funciones render-props son anonimas. Cuando utilizas una funcion como el `children` de un componente, podes definirlo afuera del componente asi tiene una referencia fija

    //no hagas esto!
    const Component = (props) => {
    return <AnotherComponent onChange={() => props.callback(props.id)} />
    }
    
    //hace esto!
    
    const Component = (props) => {
    const handleChange = useCallback(() => props.callback(props.id), [props.id]);
    return <AnotherComponent onChange={handleChange} />
    }
    
    // o esto para class-based components :)
    
    class Component extends React.Component {
   
    handleChange = () => {
    
    this.props.callback(this.props.id)
    
    }
    
    render() {
    
    return <AnotherComponent onChange={this.handleChange} />
    
    }
    
    }

  ### Eliminar variables que no se usan!
  Aqui no hay mucho que explicar, antes de un commit, cualquier variable / funcion /etc que no se use debe ser eliminada. 
 ### Usar destructuracion
 
En vez de:

    const Component = (props) => {
		const [stateA, setStateA] = useState(prop.A)
		const [stateB, setStateB] = useState(prop.B)
	
		return(<div></div>)
    }


Debemos hacer:

        const Component = ({A, B}) => {
		const [stateA, setStateA] = useState(A)
		const [stateB, setStateB] = useState(B)
	
		return(<div></div>)
    }

 ### Organizar la importacion de modulos
Parece algo poco importante, pero ayuda mucho a la hora de leer lo que sucede afuera de nuestro componente y cuales son las dependencias externas de nuestros archivos. 
La forma en cual podemos ordenar nuestros imports es:

    - Modulos principales y de funcionalidad 
	    (React, Redux, Router)
    - Componentes de Librerias
	    (Material UI, PrimeReact)
	- Componentes del Proyecto

Estas secciones basta con separarlas con un salto de linea para que sea mucho mas legible.
Adentro de estas secciones podemos ordenarlas por orden alfabetico o por el tamaño del import, personalmente prefiero ordenarlos por el tamaño del import ya que aporta a la visibilidad de los modulos, y ordenar alfabeticamente toma mucho mas tiempo sin aportar mucho al orden.
Ejemplo:  

Se ve mucho mejor esto
    
    import  React, { useEffect, useState } from  'react';
    import { ScrollView, StyleSheet, View, Share, TouchableOpacity } from  'react-native';
    import { RootStateOrAny, useDispatch, useSelector } from  'react-redux';
    import { OptionValue } from  'shopify-buy';
    
    import { downloadArrayFiles } from  '../../services/download';
    import { FAVORITE_MODAL_TOGGLE } from  '../../redux/types';
    import  ProductCard  from  '../../components/ProductCard';
    import  TextWrap  from  '../../components/TextWrap';
    import  Loader  from  '../../components/Loader';
    import  colors  from  '../../resources/colors';
    import  TopBar  from  './TopBar';

A esto

    import  React, { useEffect, useState } from  'react';
    import { OptionValue } from  'shopify-buy';
    import { downloadArrayFiles } from  '../../services/download';
    import  TopBar  from  './TopBar';
    import { ScrollView, StyleSheet, View, Share, TouchableOpacity } from  'react-native';
    import  Loader  from  '../../components/Loader';
    import { RootStateOrAny, useDispatch, useSelector } from  'react-redux';
    import  colors  from  '../../resources/colors';
    import  TextWrap  from  '../../components/TextWrap';
    import { FAVORITE_MODAL_TOGGLE } from  '../../redux/types';
    import  ProductCard  from  '../../components/ProductCard';
    
    
 ### Usar siempre formateadores de codigo
Este paso tambien es importante que configuremos un formateador de codigo y se use una unica configuracion por proyecto y si es posible mantenerla entre proyectos, para esto podemos usar Prettier para VisualStudioCode, esto nos ayudara a no tener que preocuparnos por la identacion, espaciado ni nada por el estilo, simplemente le damos a formatear y listo! pero es importante no commitear ningun archivo sin formatear para mantener la coherencia visual del codigo.

 ### Usar async await en vez de .then.catch
 Async Await es una forma moderna y mucho mejor de escribir bloques de promesas, que evita tener que estar concatenando bloques de then catch.
  ### Si hay muchos useState, considerar usar useReducer!
  Si vemos que hay mas de 4 - 5 useState, ver si se puede extrapolar a un reducer.
 
### Mas buenas practicas:
https://gist.github.com/cdiggins/338a6c31b43f5d88a73bd2aafb4204fb
https://www.bigbinary.com/react-best-practices
https://alexkondov.com/tao-of-react/


# Librerias y convenciones para los proyectos

Es importante mantener un stack de librerias que solventan problemas comunes a la mayoria de aplicaciones que sean consistentes y reusables, esto ayudara a la hora de transladarse de aplicaciones y transferir el conocimento de una app a otra.

* **Requests**:
axios https://www.npmjs.com/package/axios
* **Formularios**: 
react-hook-form https://react-hook-form.com
* **Validacion de Formulario**: 
yup https://github.com/jquense/yup
* **Rutas**
react-router https://reactrouter.com/web/guides/quick-start
* **Estado Global**
redux
https://es.redux.js.org
* **Sistema de Grilla**
bootstrap
https://getbootstrap.com/docs/5.0/getting-started/introduction/
* **Material Design Components**
material-ui
https://material-ui.com
* **Basic Components**
prime-react
https://www.primefaces.org/primereact/showcase/#/
* **Dates**
date-fns
https://date-fns.org



## Tablas

Las tablas son una parte importante en los proyectos de Gearthlogic, y como todo en programacion, se pueden armar de muchas maneras distintas, ninguna es estrictamente peor que la otra, lo malo viene cuando se empiezan a usar todas las maneras distintas en cada proyecto o inclusive dentro de un mismo proyecto.
Para solucionar esto armamos una estructura para construir tablas que cumple todos los requerimientos y restricciones que se nos presentan al tener distintos proyectos, y distintas estructuras al rededor de estos componentes.
### Estructura: 
Componente Principal
* La tabla debe estar completamente separada en componentes, los filtros por un lado, la tabla y la paginacion por otro lado, asi como cualquier componente que se pueda extrapolar.
* Toda la logica que tenga que ver o que afecte a la tabla debe estar controlada por un hook local llamado useTable.
* Mantenerlo lo mas simple posible.

Ejemplo:

	

	    import  React  from  'react';
	    
	    import  Table  from  './Table';
	    import  Filters  from  './Filters';
	    import  Paginate  from  './Paginate'
	    import  useTable  from  './useTable';
    
	    const  ClientRankingReport  = () => {
    
	    const { 
	     filteredData,
	     isLoading,
	     isError,
	     setFilters,
	     totalPaginate,
	     setCurrentPage,
	     currentPage } =  useTable()
  
	    if (!filteredData  ||  isLoading  ||  isError) return  <></>;
    
      
	    return (
		    <div  className='container p-3'>
			    <Filters setFilters={setFilters}  />
			    <Table tableData={filteredData}  />
			    <Paginate  
				    total={totalPaginate}  
				    onPaginate={setCurrentPage}  
				    currentPage={currentPage}  />
		    </div>
		    );
    
	    };
    
      
    
	   export  default  ClientRankingReport;




Tabla: 
Se tiene en cuenta, que la tabla, su formato y estilo puede cambiar dependiendo del proyecto, la tabla en la que se trabaja, las librerias usadas y demases, pero en cualquiera de estos casos el componente de la tabla deberia tener su propio archivo y componente.
La consideracion que debemos tener al crear la tabla, es que la prop **tableData** debe estar presente, y debe ser la informacion inmutable y final usada para mostrar nuestros datos. Si necesitamos hacer algun cambio, no tocaremos directamente esta varable en ninguna parte del circuito de  los componentes, luego veremos donde podemos agregar las mutaciones.
* La data es final, no se modifica
* La data debe mapearse en TableRows

Ejemplo: 

    import  React  from  'react';
    import { Table } from  'reactstrap';
    import  TableRow  from  './TableRow';
    
    const  ReportTable  = ({ tableData }) => {
	    return (
		    <div  className='table-container'>
			    <Table>
				    <thead>
					    <tr>
						    <th>Posición</th>
						    <th>Capital total</th>
						    <th>Cantidad de inversiones</th>
						    <th>Nombre completo</th>
						    <th>Email</th>
						    <th>Telefono</th>
					    </tr>
				    </thead>
				    <tbody>
					    {tableData?.length > 0  && 
					    tableData.map(data  =>  <TableRow key={data.person_id  +  data.quantity  +  data.capital}  data={data}  />)}
				    </tbody>
			    </Table>
		    </div>
	    );
    };
    
      
    
    export  default  ReportTable;


Table Row

Este sera el componente que mostrara una fila de la tabla, al igual que con la tabla, la data no se debe modificar. 
Ejemplo:

    import  React  from  'react';
    
    const  TableRow  = ({ data }) => {
	    return (
		    <tr>
			    <td>{data.posc}</td>
			    <td>{data.capital}</td>
			    <td>{data.quantity}</td>
			    <td>{data.fullname}</td>
			    <td>{data.email}</td>
			    <td>{data.phone}</td>
		    </tr>
	    );
    };
    
    export  default  TableRow;


Filtros
Los filtros varian mucho acorde al proyecto, pero la idea general es que solamente se le pase un seter como prop y que el componente maneje todo el formulario para que cuando este valido, se llame al seter, que es manejado por el useTable. Tambien es sugerido usar react-hook-form para el formulario del filtro ya que simplifica el proceso de validacion del componente. Aplicar todas las tecnicas antes mencionadas para acortar el componente.

useTable
Este hook es el corazon de nuestra logica de tablas, se armara uno por cada tabla que manejemos, aqui estaran todos los estados, efectos y llamadas a api relacionadas con nuestra tabla, para hacer estas tareas tenemos una estructura general que debemos seguir:
La llamada a la api debera realizarse con el hook de useFetch, que nos ayudara a mantener la logica de la llamada simple.
El servicio a llamar es uno de los 2 lugares donde realmente se mutara la informacion de la tabla. Mas adelante veremos de donde viene y como esta armada tableService, pero la idea es que nos devuelve la data ya formateada y lista para usar en el sistema. 
tableDataExtractionStrategy simplemente nos devuelve la data como viene:

    const  tableDataExtractionStrategy  =  data  =>  data;
 
    const [{ data, isLoading, isError }] = useFetch(tableService, [], tableDataExtractionStrategy);


La proxima parte principal de nuestro useTable es el useEffect que controlara todos las distintas partes de nuestra tabla, y mutara la informacion de nuestra tabla.


    useEffect(() => {
	    if (data) {
		    const filtered = filterData(data, filters);
		    const { paginatedData, totalPaginate } =  paginateData(filtered, currentPage, 100);
		    setTotalPaginate(totalPaginate);
		    setFilteredData(paginatedData);
	    }
    
    }, [data, filters, currentPage]);

Como vemos, este efecto cambiara solo si cambian los filtros, la informacion que viene de nuestra llamada (data), o la pagina de la paginacion en la que nos encontramos.
Aqui es donde manipularemos entre todos nuestros estados y funciones la informacion que debe salir lista para usar a la tabla (filteredData).
Si observamos bien, aqui usamos metodos como filterData, tableService, tableDataExtractionStrategy, paginateData, etc. De donde viene todo esto?
Esto lo definiremos en el segundo archivo principal de las tablas:


dataStructure
Aqui sera donde definiremos el servicio, formateo de la informacion que viene del backend, la funcion para filtrar la informacion, y logica de paginado si es necesaria.
Ejemplo:

    import { getCountries } from  '../../services/api';
    import { getRankingClients } from  '../../services/api/reports';
    import { parseTableResponse } from  '../../services/tables';
    
    const  formatData  =  data  => {
	    return {
		    capital: data.capital,
		    quantity: data.quantity,
		    person_id: data.person_id,
		    fullname: data.fullname,
		    email: data.email,
		    phone: data.phone,
		    country_id: data.country_id,
		    seller_id: data.seller_id,
		    is_regulated: data.is_regulated,
	    };
    };
    
    const  formatCountry  =  data  => {
	    return {
		    id: data.id,
		    name: data.name,
		    iso_code: data.iso_code,
	    };
    };
    
    export  const  filterData  = (data, filters) => {
	    let  fullnameFiltered  = [...data];
	    if (filters.fullname) {
		    fullnameFiltered  =  fullnameFiltered.filter(data  =>  data.fullname.toLowerCase().includes(filters.fullname.toLowerCase()));
	    }
	    let  min_capitalFiltered  =  fullnameFiltered;
	    if (filters.min_capital) {
		    min_capitalFiltered  =  min_capitalFiltered.filter(data  =>  data.capital >= filters.min_capital);
	    }
	    let  telephoneFiltered  =  min_capitalFiltered;
	    if (filters.phone) {
		    telephoneFiltered  =  telephoneFiltered.filter(data  =>  data.phone.toLowerCase().includes(filters.phone.toLowerCase()));
	    }
	    let  emailFitlered  =  telephoneFiltered;
	    if (filters.email) {
		    emailFitlered  =  emailFitlered.filter(data  =>  data.email.toLowerCase().includes(filters.email.toLowerCase()));
	    }
	    let  countryFiltered  =  emailFitlered;
	    if (filters.country_id  &&  filters.country_id  !==  '-1') {
		    countryFiltered  =  countryFiltered.filter(data  =>  String(data.country_id) ===  filters.country_id);
	    }
	    return  countryFiltered;
    };
    
      
    export  const  paginateData  = (data, currentPage, pageSize) => {
	    const  paginatedData  =  data.slice((currentPage  -  1) *  pageSize, currentPage  *  pageSize);
	    const  totalPaginate  =  Math.ceil(data.length  /  pageSize);
	    return { paginatedData, totalPaginate };
    };
    
      
    
    export  const  tableService  =  async () => {
    
	    const { data: { seller } } =  await  getRankingClients();
	    const { data: { countries } } =  await  getCountries();
	    
	    const  formatedData  = parseTableResponse(formatData, seller);
	    const  formatedCountries  = parseTableResponse(formatCountry, countries);
	    const  extraDataAdded  =  formatedData.map((data, index) => ({
		    ...data,
		    posc: index  +  1,
		    countryName: formatedCountries.find(country  =>  country.id  ===  data.country_id)?.name,
	    }));
    
	    return  extraDataAdded;
    
    };

Como ya comentamos, la data debe salir del servicio formateada para su uso dentro de la app, aunque no transformermos los nombres, este paso es necesario ya que es muy comun que se hagan cambios tanto en el front como en el back de las apps, y esto provoca tener que estar cambiando todo el circuito, en este caso solo cambiariamos formatData o formatCountry!
Esto puede variar segun las necesidades de la app, si no se puede tener la data final en el servicio, el unico otro lugar donde se puede transformar es en el useEffect del useTable.
Tambien aqui estan las funciones de filtro y paginacion, para mantener toda la logica en un solo lugar.

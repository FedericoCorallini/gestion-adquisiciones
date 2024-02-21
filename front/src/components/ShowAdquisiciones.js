import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiDeleteAdquisicion, apiGetAdquisiciones, apiGetFinanciamiento, apiPostAdquisicion } from '../axios/axios';
import { show_alerta } from '../functions';
import { Equipamientos } from './Equipamientos';
import { Bibliografias } from './Bibliografias';
import { Licencias } from './Licencias';
import { Servicios } from './Servicios';

const ShowAdquisiciones = () => {
    const [effect, setEffect] = useState(false);
    const {idFinanciamiento, motivoFinanciamiento, montoFinanciamiento} = useParams();
    const [selectedOption, setSelectedOption] = useState('servicios');
    const [financiamiento, setFinanciamiento]= useState({});
    // const urlAdquisiciones = `http://localhost:8080/${selectedOption}/financiamiento/${idFinanciamiento}`;
    // const url = `http://localhost:8080/${selectedOption}`
    // const [adquisiciones, setAdquisiciones]= useState([]);
    // const [id, setId]= useState('');
    // const [descripcion, setDescripcion]= useState('');
    // const [tipo, setTipo]= useState('');
    // const [costo, setCosto]= useState('');
    // const [operation, setOperation]= useState(1);
    // const [title, setTitle]= useState('');
    // const [denominacion, setDenominacion]= useState('');
    // const [isbn, setIsbn]=useState('');
    // const [issn, setIssn]=useState('');
    // const [nombreAutor, setNombreAutor]=useState('');
    // const [apellidoAutor, setApellidoAutor]=useState('');
    // const [editorial, setEditorial]=useState('');
    // const [titulo, setTitulo]=useState('');
    // const [urlBiliografia, setUrlBibliografia]=useState('');
    // const [fabricante, setFabricante]=useState('');
    // const [nombre, setNombre]=useState('');
    // const [numeroRelease, setNumeroRelease]=useState('');
    // const [version, setVersion]=useState('');
    // const adquisicionesList = adquisiciones.content || [];
    // const rowsWithRowNumber = adquisicionesList.map((row, index) => ({ ...row, rowNumber: index + 1 }));

    const [fillActive, setFillActive] = useState('servicios');

    const handleFillClick = (value) => {
        if (value === fillActive) {
            return;
        }
    setSelectedOption(value)
    setFillActive(value);
    };
    
    useEffect(() => {
        // getAdquisiciones();
        getFinanciamiento();
        setEffect(false);
    }, [selectedOption, effect]);

    const getFinanciamiento = async () => {
        const respuesta = await apiGetFinanciamiento('http://localhost:8080/fuentes-financiamiento/' + idFinanciamiento);
        setFinanciamiento(respuesta.data);  
    }

    // const getAdquisiciones = async () => {
    //     const respuesta = await apiGetAdquisiciones(urlAdquisiciones);
    //     setAdquisiciones(respuesta.data);  
    // }


    // const openModal = (op, id, tipo, descripcion, costo, denominacion, nombreAutor, apellidoAutor, editorial, issn, isbn, titulo, urlBiliografia, numeroRelease, version, fabricante, nombre, selectedOption) =>{
    //     setUrlBibliografia('');
    //     setTitulo('');
    //     setEditorial('');
    //     setApellidoAutor('');
    //     setIssn('');
    //     setIsbn('');
    //     setNombreAutor('');
    //     setDescripcion('');
    //     setCosto('');
    //     setOperation(op);
    //     setVersion('');
    //     setNumeroRelease('');
    //     setNombre('');
    //     setFabricante('');
    //     setDenominacion('');
    //     setTipo('');
    //     if(op === 1){
    //         setTitle('Registrar adquisicion');
    //         setId(idFinanciamiento);  
    //         setDescripcion('');
    //         setCosto('');

    //         if(selectedOption === 'servicios'){
    //             setTipo('');
    //         }
    //         else if(selectedOption === 'equipamientos'){
    //             setDenominacion('');
    //         }
    //         else if(selectedOption === 'licencias'){
    //             setVersion('');
    //             setNumeroRelease('');
    //             setNombre('');
    //             setFabricante('');
    //         }
    //         else if(selectedOption === 'bibliografias'){
    //             setUrlBibliografia('');
    //             setTitulo('');
    //             setEditorial('');
    //             setApellidoAutor('');
    //             setIssn('');
    //             setIsbn('');
    //             setNombreAutor('');
    //         }
            
    //     }
    //     else if(op === 2){
    //         setTitle('Editar adquisicion');
    //         setId(id);
    //         setDescripcion(descripcion);
    //         setCosto(costo);
    //         if(selectedOption === 'servicios'){
    //             setTipo(tipo);
    //         }
    //         else if(selectedOption === 'equipamientos'){
    //             setDenominacion(denominacion);
    //         }
    //         else if(selectedOption === 'licencias'){
    //             setVersion(version);
    //             setNumeroRelease(numeroRelease);
    //             setNombre(nombre);
    //             setFabricante(fabricante);
    //         }
    //         else if(selectedOption === 'bibliografias'){
    //             setUrlBibliografia(urlBiliografia);
    //             setTitulo(titulo);
    //             setEditorial(editorial);
    //             setApellidoAutor(apellidoAutor);
    //             setIssn(issn);
    //             setIsbn(isbn);
    //             setNombreAutor(nombreAutor);
    //         }
  
    //     }
        
    //     else if(op === 3){
    //         setTitle('Detalles de la adquisicion');
    //         setId(id);
    //         setDescripcion(descripcion);
    //         setCosto(costo);
    //         if(selectedOption === 'servicios'){
    //             setTipo(tipo);
    //         }
    //         else if(selectedOption === 'equipamientos'){
    //             setDenominacion(denominacion);
    //         }
    //         else if(selectedOption === 'licencias'){
    //             setVersion(version);
    //             setNumeroRelease(numeroRelease);
    //             setNombre(nombre);
    //             setFabricante(fabricante);
    //         }
    //         else if(selectedOption === 'bibliografias'){
    //             setUrlBibliografia(urlBiliografia);
    //             setTitulo(titulo);
    //             setEditorial(editorial);
    //             setApellidoAutor(apellidoAutor);
    //             setIssn(issn);
    //             setIsbn(isbn);
    //             setNombreAutor(nombreAutor);
    //         }
  
    //     }       
    //     // window.setTimeout(function(){
    //     //     document.getElementById('descripcion').focus();
    //     // },500);
    // }

    // const validarServicio = () => {
    //     var parametros;
    //     var metodo;
    //     if(descripcion.trim() === ''){
    //         show_alerta('Escriba la descripcion de la adquisicion','warning');
    //     }
    //     else if(costo === ''){
    //         show_alerta('Escriba el precio de la adquisicion','warning');
    //     }
    //     else{
    //         if(operation === 1){
    //             parametros= {tipo:tipo.trim(),descripcion: descripcion.trim(),costo:costo};
    //             metodo= 'POST';
    //         }
    //         else{
    //             parametros={id:id,tipo:tipo.trim(),descripcion: descripcion.trim(),costo:costo};
    //             metodo= 'PUT';
    //         }
    //         enviarSolicitud(metodo,parametros);
    //     }
    // }

    // const validarLicencia = () => {
    //     var parametros;
    //     var metodo;
    //     if(descripcion.trim() === ''){
    //         show_alerta('Escriba la descripcion de la adquisicion','warning');
    //     }
    //     else if(costo === ''){
    //         show_alerta('Escriba el precio de la adquisicion','warning');
    //     }
    //     else{
    //         if(operation === 1){
    //             parametros= {fabricante:fabricante.trim(),version:version.trim(),nombre:nombre.trim(),numero_release:numeroRelease.trim(),descripcion: descripcion.trim(),costo:costo};
    //             metodo= 'POST';
    //         }
    //         else{
    //             parametros={id:id,fabricante:fabricante.trim(),version:version.trim(),nombre:nombre.trim(),numero_release:numeroRelease.trim(),descripcion: descripcion.trim(),costo:costo};
    //             metodo= 'PUT';
    //         }
    //         enviarSolicitud(metodo,parametros);
    //     }
    // }

    // const validarEquipamiento = () => {
    //     var parametros;
    //     var metodo;
    //     if(descripcion.trim() === ''){
    //         show_alerta('Escriba la descripcion de la adquisicion','warning');
    //     }
    //     else if(costo === ''){
    //         show_alerta('Escriba el precio de la adquisicion','warning');
    //     }
    //     else{
    //         if(operation === 1){
    //             parametros= {denominacion:denominacion.trim(),descripcion: descripcion.trim(),costo:costo};
    //             metodo= 'POST';
    //         }
    //         else{
    //             parametros={id:id,denominacion:denominacion.trim(),descripcion: descripcion.trim(),costo:costo};
    //             metodo= 'PUT';
    //         }
    //         enviarSolicitud(metodo,parametros);
    //     }
    // }

    // const validarBibliografia = () => {
    //     var parametros;
    //     var metodo;
    //     if(descripcion.trim() === ''){
    //         show_alerta('Escriba la descripcion de la adquisicion','warning');
    //     }
    //     else if(costo === ''){
    //         show_alerta('Escriba el precio de la adquisicion','warning');
    //     }
    //     else{
    //         if(operation === 1){
    //             parametros= {editorial:editorial.trim(),nombre_autor:nombreAutor.trim(),apellido_autor:apellidoAutor.trim(),isbn:isbn.trim(),issn:issn.trim(),titulo:titulo.trim(),url:urlBiliografia.trim(),descripcion: descripcion.trim(),costo:costo};
    //             metodo= 'POST';
    //         }
    //         else{
    //             parametros={id:id,editorial:editorial.trim(),nombre_autor:nombreAutor.trim(),apellido_autor:apellidoAutor.trim(),isbn:isbn.trim(),issn:issn.trim(),titulo:titulo.trim(),url:urlBiliografia.trim(),descripcion: descripcion.trim(),costo:costo};
    //             metodo= 'PUT';
    //         }
    //         enviarSolicitud(metodo,parametros);
    //     }
    // }

    // const enviarSolicitud = async(metodo, parametros) => {
    //     await apiPostAdquisicion({ method: metodo, url: `${url}/${id}`, data: parametros }).then((respuesta) => {
    //         console.log(respuesta)
    //         show_alerta(metodo==='POST'? 'Adquisicion agregada' : 'Adquisicion modificada', tipo);
    //         if(tipo === 'success'){
    //             document.getElementById('btnCerrar').click();
    //             getAdquisiciones();
    //         }
    //         setEffect(true);
    //     })
    //     .catch(function(error){
    //         show_alerta('Error en la solicitud','error');
    //         console.log(error);
    //     });
    // }

    // const deleteProduct = (adquisicion) => {
    //     const MySwal = withReactContent(Swal);
    //     MySwal.fire({
    //         title:'¿Esta seguro que desea eliminar la adquisicion?',
    //         icon: 'question',text:'No se podrá dar marcha atrás',
    //         showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    //     }).then(async (result) => {
    //         if(result.isConfirmed) {
    //             await apiDeleteAdquisicion(url, adquisicion.id);
    //             setEffect(true);
    //         } else {
    //             show_alerta('La adquisicion no fue eliminada','info');
    //         }
    //     });
    // }

    
    // const data = {
    //     columns: [
    //         {label: 'Numero', field: 'rowNumber'},
    //         {label: 'Descripcion', field: 'descripcion'},
    //         {label: 'Precio', field: 'costo'},
    //         {label: 'Acciones', field: 'acciones'}
            
    //       ],
    //     rows: []
    // };

    // rowsWithRowNumber.forEach(adquisicion => {
    //     data.rows.push({
    //         rowNumber: adquisicion.rowNumber,
    //         descripcion: adquisicion.descripcion,
    //         costo: adquisicion.costo,
    //         acciones: (    
    //         <td >
    //             <button onClick={() => openModal(
    //                 3,
    //                 adquisicion.id,
    //                 adquisicion.tipo,
    //                 adquisicion.descripcion,
    //                 adquisicion.costo,
    //                 adquisicion.denominacion,
    //                 adquisicion.nombre_autor,
    //                 adquisicion.apellido_autor,
    //                 adquisicion.editorial,
    //                 adquisicion.issn,
    //                 adquisicion.isbn,
    //                 adquisicion.titulo,
    //                 adquisicion.url,
    //                 adquisicion.numero_release,
    //                 adquisicion.version,
    //                 adquisicion.fabricante,
    //                 adquisicion.nombre,
    //                 selectedOption
    //                 )}
    //                  className='btn btn-secondary' data-bs-toggle='modal' data-bs-target={`#modalProducts-${selectedOption}-ver`}>
    //                 <i className='fa-solid fa-eye'></i>
    //             </button>
    //             &nbsp; 
    //             <button onClick={() => openModal(
    //                 2,
    //                 adquisicion.id,
    //                 adquisicion.tipo,
    //                 adquisicion.descripcion,
    //                 adquisicion.costo,
    //                 adquisicion.denominacion,
    //                 adquisicion.nombre_autor,
    //                 adquisicion.apellido_autor,
    //                 adquisicion.editorial,
    //                 adquisicion.issn,
    //                 adquisicion.isbn,
    //                 adquisicion.titulo,
    //                 adquisicion.url,
    //                 adquisicion.numero_release,
    //                 adquisicion.version,
    //                 adquisicion.fabricante,
    //                 adquisicion.nombre,
    //                 selectedOption
    //                 )}
    //                  className='btn btn-warning' data-bs-toggle='modal' data-bs-target={`#modalProducts-${selectedOption}`}>
    //                 <i className='fa-solid fa-pen'></i>
    //             </button>
    //             &nbsp; 
    //             <button onClick={() => deleteProduct(adquisicion)} className='btn btn-danger'>
    //                 <i className='fa-solid fa-trash'></i>
    //             </button>    
    //         </td>)
    //     })
    // });


  return (
    <div className='App'>
        <h1 className='col-0 col-lg-12 offset-0 offset-lg-0 d-grid justify-items-start fw-lighter' style={{ fontSize: '18px', color: 'Dimgrey', textAlign: 'left', marginBottom: "20px" }}>
            <th >
            Fuente de financiamiento: <span className="fw-lighter">{motivoFinanciamiento}</span> 
            </th> 
            <th>
            Monto disponible: $<span className="fw-lighter">{financiamiento.monto}</span>
            </th>                  
        </h1>
        <div className='col-0 col-lg-10 offset-0 offset-lg-1'>
        <MDBTabs pills className='mb-3' fill nav-link-disabled-color style={{ fontSize: '16px', fontWeight: 'bold', color: 'blue' }}>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleFillClick('servicios')} active={fillActive === 'servicios'}>
                    Servicios
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleFillClick('equipamientos')} active={fillActive === 'equipamientos'}>
                    Equipamientos
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleFillClick('bibliografias')} active={fillActive === 'bibliografias'}>
                    Bibliografias
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleFillClick('licencias')} active={fillActive === 'licencias'}>
                    Licencias
                </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>
        </div>
        <MDBTabsContent >
                <MDBTabsPane open={fillActive === 'servicios'}><Servicios actualizarFinanciamiento={setEffect} /></MDBTabsPane>
                <MDBTabsPane open={fillActive === 'equipamientos'}><Equipamientos actualizarFinanciamiento={setEffect} /></MDBTabsPane>
                <MDBTabsPane open={fillActive === 'bibliografias'}><Bibliografias actualizarFinanciamiento={setEffect} /></MDBTabsPane>
                <MDBTabsPane open={fillActive === 'licencias'}><Licencias actualizarFinanciamiento={setEffect} /></MDBTabsPane>
        </MDBTabsContent>
        
        
{/*         
        <div className='row mt-3'>
            <div className='col-lg-10 offset-lg-1'>
            <MDBDataTable 
             hover
             data={data}
             striped
             entriesOptions={[5, 10, 20, 50]} 
             entries={5} 
             small
             noBottomColumns={true}
             selectRows={true}
             
            >
            </MDBDataTable>
            <div>
            
                            
                <Link to={"/index"} className="col-md-1 offset-md-0 btn btn-dark">
                    <i className="fa fa-arrow-left"></i>
                </Link>      
                    <button onClick={()=> openModal(1)} className='col-md-3 offset-md-8 btn btn-success' data-bs-toggle='modal' data-bs-target={`#modalProducts-${selectedOption}`}>
                        <i className='fa-solid fa-circle-plus'>
                        </i> Agregar
                </button>
                  
            </div>

            </div>

        </div>
        <div id='modalProducts-servicios-ver' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                   
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'> </i></span>
                            <input type='text' id='tipo' className='form-control' placeholder='Tipo' value={tipo}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'> </i> </span>
                            <input type='text' id='precio' className='form-control' placeholder='Precio' value={costo}
                            ></input>
                        </div>                 
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalProducts-servicios' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                   
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'> </i></span>
                            <input type='text' id='tipo' className='form-control' placeholder='Tipo' value={tipo}
                            onChange={(e)=> setTipo(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'> </i> </span>
                            <input type='text' id='precio' className='form-control' placeholder='Precio' value={costo}
                            onChange={(e)=> setCosto(e.target.value)}></input>
                        </div>
                                            
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validarServicio()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalProducts-equipamientos' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='denominacion' className='form-control' placeholder='Denominacion' value={denominacion}
                            onChange={(e)=> setDenominacion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='text' id='precio' className='form-control' placeholder='Precio' value={costo}
                            onChange={(e)=> setCosto(e.target.value)}></input>
                        </div>
                                 
                                            
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validarEquipamiento()} className='btn btn-success' >
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalProducts-equipamientos-ver' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='denominacion' className='form-control' placeholder='Denominacion' value={denominacion}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='text' id='precio' className='form-control' placeholder='Precio' value={costo}
                            ></input>
                        </div>
                                 
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalProducts-bibliografias' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                   
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='nombreAutor' className='form-control' placeholder='Nombre Autor' value={nombreAutor}
                            onChange={(e)=> setNombreAutor(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='apellidoAutor' className='form-control' placeholder='Apellido Autor' value={apellidoAutor}
                            onChange={(e)=> setApellidoAutor(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='issn' className='form-control' placeholder='Issn' value={issn}
                            onChange={(e)=> setIssn(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='isbn' className='form-control' placeholder='Isbn' value={isbn}
                            onChange={(e)=> setIsbn(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='editorial' className='form-control' placeholder='Editorial' value={editorial}
                            onChange={(e)=> setEditorial(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='urlBibliografia' className='form-control' placeholder='Url Bibliografia' value={urlBiliografia}
                            onChange={(e)=> setUrlBibliografia(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='titulo' className='form-control' placeholder='Titulo' value={titulo}
                            onChange={(e)=> setTitulo(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='text' id='precio' className='form-control' placeholder='Precio' value={costo}
                            onChange={(e)=> setCosto(e.target.value)}></input>
                        </div>
                                            
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validarBibliografia()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalProducts-bibliografias-ver' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                   
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='nombreAutor' className='form-control' placeholder='Nombre Autor' value={nombreAutor}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='apellidoAutor' className='form-control' placeholder='Apellido Autor' value={apellidoAutor}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='issn' className='form-control' placeholder='Issn' value={issn}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='isbn' className='form-control' placeholder='Isbn' value={isbn}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='editorial' className='form-control' placeholder='Editorial' value={editorial}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='urlBibliografia' className='form-control' placeholder='Url Bibliografia' value={urlBiliografia}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='titulo' className='form-control' placeholder='Titulo' value={titulo}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='text' id='precio' className='form-control' placeholder='Precio' value={costo}
                            ></input>
                        </div>
                                            
                  
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalProducts-licencias' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='numeroRelease' className='form-control' placeholder='Numero Release' value={numeroRelease}
                            onChange={(e)=> setNumeroRelease(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='fabricante' className='form-control' placeholder='Fabricante' value={fabricante}
                            onChange={(e)=> setFabricante(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='version' className='form-control' placeholder='Version' value={version}
                            onChange={(e)=> setVersion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre}
                            onChange={(e)=> setNombre(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='text' id='precio' className='form-control' placeholder='Precio' value={costo}
                            onChange={(e)=> setCosto(e.target.value)}></input>
                        </div>
                                 
                                            
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validarLicencia()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalProducts-licencias-ver' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='numeroRelease' className='form-control' placeholder='Numero Release' value={numeroRelease}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='fabricante' className='form-control' placeholder='Fabricante' value={fabricante}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='version' className='form-control' placeholder='Version' value={version}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='text' id='precio' className='form-control' placeholder='Precio' value={costo}
                            ></input>
                        </div>
                                 
                                
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div> */}
    </div>
  )
}

export default ShowAdquisiciones
import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiDeleteAdquisicion, apiGetAdquisiciones, apiPostAdquisicion } from '../axios/axios';
import { show_alerta } from '../functions';
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Bibliografias = ({ actualizarFinanciamiento }) => {
    const [effect, setEffect] = useState(false);
    const {idFinanciamiento, motivoFinanciamiento, montoFinanciamiento} = useParams();
    const urlAdquisiciones = `http://localhost:8080/bibliografias/financiamiento/${idFinanciamiento}`;
    const url = 'http://localhost:8080/bibliografias'
    const [adquisiciones, setAdquisiciones]= useState([]);
    const [id, setId]= useState('');
    const [descripcion, setDescripcion]= useState('');
    const [costo, setCosto]= useState('');
    const [operation, setOperation]= useState(1);
    const [title, setTitle]= useState('');
    const [isbn, setIsbn]=useState('');
    const [issn, setIssn]=useState('');
    const [nombreAutor, setNombreAutor]=useState('');
    const [apellidoAutor, setApellidoAutor]=useState('');
    const [editorial, setEditorial]=useState('');
    const [titulo, setTitulo]=useState('');
    const [urlBiliografia, setUrlBibliografia]=useState('');
    const [anioPubicacion, setAnioPublicacion] = useState('');
    const [tipo, setTipo]= useState('');
    const [costoError, setCostoError] = useState('');
    const [descripcionError, setDescripcionError] = useState('');
    const [fechaError, setFechaError] = useState('');
  
    const adquisicionesList = adquisiciones.content || [];
    const rowsWithRowNumber = adquisicionesList.map((row, index) => ({ ...row, rowNumber: index + 1 }));

    useEffect(() => {
        getAdquisiciones();
        setEffect(false);
    }, [effect]);

    const getAdquisiciones = async () => {
        const respuesta = await apiGetAdquisiciones(urlAdquisiciones);
        setAdquisiciones(respuesta.data);  
    }

    const openModal = (op, id, descripcion, costo, nombreAutor, apellidoAutor, editorial, issn, isbn, titulo, urlBiliografia, anioPubicacion, tipo) =>{
        setUrlBibliografia('');
        setTitulo('');
        setEditorial('');
        setApellidoAutor('');
        setIssn('');
        setIsbn('');
        setNombreAutor('');
        setDescripcion('');
        setTipo('');
        setCosto('');
        setAnioPublicacion('');
        setOperation(op);
      
        if(op === 1){
            setTitle('Registrar bibliografia');
            setId(idFinanciamiento);  
            setDescripcion('');
            setCosto('');
            setUrlBibliografia('');
            setTitulo('');
            setEditorial('');
            setApellidoAutor('');
            setIssn('');
            setIsbn('');
            setNombreAutor(''); 
            setAnioPublicacion('');  
            setTipo('');        
        }
        else if(op === 2){
            setTitle('Editar bibliografia');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setUrlBibliografia(urlBiliografia);
            setTitulo(titulo);
            setEditorial(editorial);
            setApellidoAutor(apellidoAutor);
            setIssn(issn);
            setIsbn(isbn);
            setNombreAutor(nombreAutor); 
            setAnioPublicacion(anioPubicacion); 
            setTipo(tipo);
        }
        else if(op === 3){
            setTitle('Detalles de bibliografia');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setUrlBibliografia(urlBiliografia);
            setTitulo(titulo);
            setEditorial(editorial);
            setApellidoAutor(apellidoAutor);
            setIssn(issn);
            setIsbn(isbn);
            setNombreAutor(nombreAutor);
            setAnioPublicacion(anioPubicacion);
            setTipo(tipo);    
            }
        }
    
    const limpiarErrores = () => {
        setCostoError('');
        setDescripcionError('');
        setFechaError('');
    }

    const validarBibliografia = () => {
        var parametros;
        var metodo;
        var enviar = true;
        limpiarErrores();

        if(descripcion.trim() === ''){
            setDescripcionError('La descripcion es obligatoria');
            enviar = false;
        }
        if(isNaN(Number(costo)) || (Number(costo)) <= 0){
            setCostoError('El precio debe ser un numero mayor a cero');
            enviar = false;
        }
        if(anioPubicacion === null || anioPubicacion === ''){
            setFechaError('Debe seleccionar una fecha de incorporacion');
            enviar = false;
        }
        else if(anioPubicacion > Date.now()){
            setFechaError('El año de publicacion no puede ser posterior al año corriente')
            enviar = false;
        }
        if (enviar) {
            if(operation === 1){
                parametros= {
                    editorial:editorial.trim(),
                    nombre_autor:nombreAutor.trim(),
                    apellido_autor:apellidoAutor.trim(),
                    isbn:isbn.trim(),
                    issn:issn.trim(),
                    titulo:titulo.trim(),
                    url:urlBiliografia.trim(),
                    descripcion: descripcion.trim(),
                    anio_publicacion: format(anioPubicacion, 'yyyy-MM-dd'),
                    tipo:tipo.trim(),
                    costo:costo};
                metodo= 'POST';
            }
            else{
                parametros={
                    id:id,
                    editorial:editorial.trim(),
                    nombre_autor:nombreAutor.trim(),
                    apellido_autor:apellidoAutor.trim(),
                    isbn:isbn.trim(),issn:issn.trim(),
                    titulo:titulo.trim(),
                    url:urlBiliografia.trim(),
                    descripcion: descripcion.trim(),
                    anio_publicacion: format(anioPubicacion, 'yyyy-MM-dd'),
                    tipo:tipo.trim(),
                    costo:costo};
                metodo= 'PUT';
            }
            enviarSolicitud(metodo,parametros);
        }
    }

    const enviarSolicitud = async(metodo, parametros) => {
        await apiPostAdquisicion({ method: metodo, url: `${url}/${id}`, data: parametros }).then((respuesta) => {
            show_alerta(metodo==='POST'? 'Adquisicion agregada' : 'Adquisicion modificada', 'success');
            setEffect(true);
            actualizarFinanciamiento(true);
        })
        .catch(function(error){
            show_alerta(error.response.data.message,'error');
            console.log(error);
        });
    }

    const deleteProduct = (adquisicion) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿Esta seguro que desea eliminar la adquisicion?',
            icon: 'question',text:'No se podrá dar marcha atrás',
            showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
        }).then(async (result) => {
            if(result.isConfirmed) {
                await apiDeleteAdquisicion(url, adquisicion.id);
                show_alerta('La adquisicion fue eliminada','success');
                setEffect(true);
                actualizarFinanciamiento(true);
            } else {
                show_alerta('La adquisicion no fue eliminada','info');
            }
        });
    }

    const data = {
        columns: [
            {label: 'Numero', field: 'rowNumber'},
            {label: 'Descripcion', field: 'descripcion'},
            {label: 'Precio', field: 'costo'},
            {label: 'Titulo', field: 'titulo'},
            {label: 'Autor', field: 'autor'},
            {label: 'Editorial', field: 'editorial'},
            {label: 'Año', field: 'anioPublicacion'},
            {label: 'Tipo', field: 'tipo'},
            {label: 'Acciones', field: 'acciones'}
            
          ],
        rows: []
    };

    rowsWithRowNumber.forEach(adquisicion => {
        data.rows.push({
            rowNumber: adquisicion.rowNumber,
            descripcion: adquisicion.descripcion,
            costo: adquisicion.costo,
            titulo: adquisicion.titulo,
            editorial: adquisicion.editorial,
            anioPublicacion: adquisicion.anio_publicacion.substring(0,4),
            autor: adquisicion.apellido_autor + ' ' + adquisicion.nombre_autor,
            tipo: adquisicion.tipo,
            acciones: (    
            <td >
                <button onClick={() => openModal(
                    3,
                    adquisicion.id,
                    adquisicion.descripcion,
                    adquisicion.costo,
                    adquisicion.nombre_autor,
                    adquisicion.apellido_autor,
                    adquisicion.editorial,
                    adquisicion.issn,
                    adquisicion.isbn,
                    adquisicion.titulo,
                    adquisicion.url,
                    adquisicion.anio_publicacion,
                    adquisicion.tipo
                    )}
                     className='btn btn-secondary' data-bs-toggle='modal' data-bs-target={'#modalProducts-bibliografias-ver'}>
                    <i className='fa-solid fa-eye'></i>
                </button>
                &nbsp; 
                <button onClick={() => openModal(
                    2,
                    adquisicion.id,
                    adquisicion.descripcion,
                    adquisicion.costo,
                    adquisicion.nombre_autor,
                    adquisicion.apellido_autor,
                    adquisicion.editorial,
                    adquisicion.issn,
                    adquisicion.isbn,
                    adquisicion.titulo,
                    adquisicion.url,
                    adquisicion.anio_publicacion,
                    adquisicion.tipo
                    )}
                     className='btn btn-warning' data-bs-toggle='modal' data-bs-target={'#modalProducts-bibliografias'}>
                    <i className='fa-solid fa-pen'></i>
                </button>
                &nbsp; 
                <button onClick={() => deleteProduct(adquisicion)} className='btn btn-danger'>
                    <i className='fa-solid fa-trash'></i>
                </button>    
            </td>)
        })
    });

  return (
    <div className='App'>
        <div className='row mt-3'> 
            <div className='col-lg-10 offset-lg-1'>
                <MDBDataTable 
                hover
                data={data}
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
                    <button onClick={()=> openModal(1)} className='col-md-3 offset-md-8 btn btn-success' data-bs-toggle='modal' data-bs-target={'#modalProducts-bibliografias'}>
                        <i className='fa-solid fa-circle-plus'>
                        </i> Agregar
                    </button>        
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
                            <input type='text' id='descripcion' className={`form-control ${descripcionError ? 'is-invalid' : ''}`} placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        {descripcionError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{descripcionError}</div>}
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='titulo' className='form-control' placeholder='Titulo' value={titulo}
                            onChange={(e)=> setTitulo(e.target.value)}></input>
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
                            <input type='text' id='tipo' className='form-control' placeholder='Tipo' value={tipo}
                            onChange={(e)=> setTipo(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='text' id='precio' className={`form-control ${costoError ? 'is-invalid' : ''}`} placeholder='Precio' value={costo}
                            onChange={(e)=> setCosto(e.target.value)}></input>
                        </div>
                        {costoError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{costoError}</div>} 
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                                <DatePicker
                                    selected={anioPubicacion}
                                    value={anioPubicacion}
                                    onChange={(date) => setAnioPublicacion(date)}
                                    className={`form-control ${fechaError ? 'is-invalid' : ''}`}
                                    placeholderText='Año de publicacion'
                                    showYearPicker
                                    dateFormat="yyyy"
                                />
                        </div>  
                        {fechaError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{fechaError}</div>}                     
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validarBibliografia()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button onClick={() => limpiarErrores()} type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
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
                            <input type='text' id='titulo' className='form-control' placeholder='Titulo' value={titulo}
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
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                            <input type='text' id='anioPublicacion' className='form-control' placeholder='Año de publicacion' value={anioPubicacion}
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='tipo' className='form-control' placeholder='Tipo' value={tipo}
                            onChange={(e)=> setTipo(e.target.value)}></input>
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
    </div>
  )
}

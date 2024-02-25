import { format } from 'date-fns';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiDeleteAdquisicion, apiGetAdquisiciones, apiPostAdquisicion } from '../axios/axios';
import { show_alerta } from '../functions';

export const Equipamientos = ({ actualizarFinanciamiento }) => {
    const [effect, setEffect] = useState(false);
    const {idFinanciamiento} = useParams();
    const urlAdquisiciones = `http://localhost:8080/equipamientos/financiamiento/${idFinanciamiento}`;
    const url = 'http://localhost:8080/equipamientos'
    const [adquisiciones, setAdquisiciones]= useState([]);
    const [id, setId]= useState('');
    const [descripcion, setDescripcion]= useState('');
    const [costo, setCosto]= useState('');
    const [fechaIncorporacion, setFechaIncorporacion] = useState('');
    const [operation, setOperation]= useState(1);
    const [title, setTitle]= useState('');
    const [denominacion, setDenominacion]= useState('');
    const [descripcionError, setDescripcionError] = useState('');
    const [costoError, setCostoError] = useState('');
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

    const openModal = (op, id, descripcion, costo, denominacion, fechaIncorporacion) =>{   
        setDescripcion('');
        setCosto('');
        setOperation(op);
        setDenominacion('');
        setFechaIncorporacion('');

        if(op === 1){
            setTitle('Registrar equipamiento');
            setId(idFinanciamiento);  
            setDescripcion('');
            setCosto('');
            setDenominacion('');  
            setFechaIncorporacion('');        
        }
        else if(op === 2){
            setTitle('Editar equipamiento');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setDenominacion(denominacion);
            setFechaIncorporacion(fechaIncorporacion);
        }
        else if(op === 3){
            setTitle('Detalles de equipamiento');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setDenominacion(denominacion);
            setFechaIncorporacion(fechaIncorporacion);
        }   
    }

    const limpiarErrores = () => {
        setCostoError('');
        setDescripcionError('');
        setFechaError('');
    }

    const validarEquipamiento = () => {
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
        if(fechaIncorporacion === null || fechaIncorporacion === ''){
            setFechaError('Debe seleccionar una fecha de incorporacion');
            enviar = false;
        }
        else if(fechaIncorporacion > Date.now()){
            setFechaError('La fecha de incorporacion no puede ser posterior a la fecha actual')
            enviar = false;
        }
        if (enviar) {
            if(operation === 1){
                parametros= {
                    denominacion:denominacion.trim(),
                    descripcion: descripcion.trim(),
                    fecha_incorporacion: format(fechaIncorporacion, 'yyyy-MM-dd'),
                    costo:costo};
                metodo= 'POST';
            }
            else{
                parametros={
                    id:id,
                    denominacion:denominacion.trim(),
                    descripcion: descripcion.trim(),
                    fecha_incorporacion: format(fechaIncorporacion, 'yyyy-MM-dd'),
                    costo:costo};
                metodo= 'PUT';
            }
            enviarSolicitud(metodo,parametros);
        }
    }

    const enviarSolicitud = async(metodo, parametros) => {
        await apiPostAdquisicion({ method: metodo, url: `${url}/${id}`, data: parametros }).then(() => {
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
            {label: 'Denominacion', field: 'denominacion'},
            {label: 'Fecha Incorporacion', field: 'fechaIncorporacion'},
            {label: 'Acciones', field: 'acciones'}      
        ],
        rows: []
    };

    rowsWithRowNumber.forEach(adquisicion => {
        data.rows.push({
            rowNumber: adquisicion.rowNumber,
            descripcion: adquisicion.descripcion,
            costo: adquisicion.costo,
            denominacion: adquisicion.denominacion,
            fechaIncorporacion: adquisicion.fecha_incorporacion,
            acciones: (    
            <td >
                <button onClick={() => openModal(
                    3,
                    adquisicion.id,
                    adquisicion.descripcion,
                    adquisicion.costo,
                    adquisicion.denominacion,
                    adquisicion.fecha_incorporacion
                    )}
                     className='btn btn-secondary' data-bs-toggle='modal' data-bs-target={'#modalProducts-equipamientos-ver'}>
                    <i className='fa-solid fa-eye'></i>
                </button>
                &nbsp; 
                <button onClick={() => openModal(
                    2,
                    adquisicion.id,
                    adquisicion.descripcion,
                    adquisicion.costo,
                    adquisicion.denominacion,
                    adquisicion.fecha_incorporacion
                    )}
                     className='btn btn-warning' data-bs-toggle='modal' data-bs-target={'#modalProducts-equipamientos'}>
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
                    <button onClick={()=> openModal(1)} className='col-md-3 offset-md-8 btn btn-success' data-bs-toggle='modal' data-bs-target={'#modalProducts-equipamientos'}>
                        <i className='fa-solid fa-circle-plus'>
                        </i> Agregar
                    </button>        
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
                            <input type='text' id='descripcion' className={`form-control ${descripcionError ? 'is-invalid' : ''}`} placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        {descripcionError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{descripcionError}</div>}
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='denominacion' className='form-control' placeholder='Denominacion' value={denominacion}
                            onChange={(e)=> setDenominacion(e.target.value)}></input>
                        </div>
                        {/* <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='fechaIncorporacion' className='form-control' placeholder='Fecha Incorporacion' value={fechaIncorporacion}
                            onChange={(e)=> setFechaIncorporacion(e.target.value)}></input>
                        </div> */}
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='text' id='precio' className={`form-control ${costoError ? 'is-invalid' : ''}`} placeholder='Precio' value={costo}
                            onChange={(e)=> setCosto(e.target.value)}></input>
                        </div>
                        {costoError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{costoError}</div>}

                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                                <DatePicker
                                    selected={fechaIncorporacion}
                                    value={fechaIncorporacion}
                                    onChange={(date) => setFechaIncorporacion(date)}
                                    className={`form-control ${fechaError ? 'is-invalid' : ''}`}
                                    placeholderText='Fecha Incorporacion'
                                    dateFormat="yyyy-MM-dd"
                                />
                        </div>  
                        {fechaError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{fechaError}</div>}                                                  
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validarEquipamiento()} className='btn btn-success' >
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
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                            <input type='text' id='fechaIncorporacion' className='form-control' placeholder='Fecha Incorporacion' value={fechaIncorporacion || '' }
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

import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiDeleteAdquisicion, apiGetAdquisiciones, apiPostAdquisicion } from '../axios/axios';
import { show_alerta } from '../functions';
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Licencias = ({ actualizarFinanciamiento }) => {
    const [effect, setEffect] = useState(false);
    const {idFinanciamiento, motivoFinanciamiento, montoFinanciamiento} = useParams();
    const urlAdquisiciones = `http://localhost:8080/licencias/financiamiento/${idFinanciamiento}`;
    const url = 'http://localhost:8080/licencias'
    const [adquisiciones, setAdquisiciones]= useState([]);
    const [id, setId]= useState('');
    const [descripcion, setDescripcion]= useState('');
    const [costo, setCosto]= useState('');
    const [operation, setOperation]= useState(1);
    const [title, setTitle]= useState('');
    const [fabricante, setFabricante]=useState('');
    const [nombre, setNombre]=useState('');
    const [numeroRelease, setNumeroRelease]=useState('');
    const [anio, setAnio]=useState('');
    const [fechaVencimiento, setFechaVencimiento]=useState('');
    const [fechaOtorgamiento, setFechaOtorgamiento]=useState('');
    const [version, setVersion]=useState('');
    const [costoError, setCostoError] = useState('');
    const [descripcionError, setDescripcionError] = useState('');
    const [vencimientoError, setVencimientoError] = useState('');
    const [otorgamientoError, setOtorgamientoError] = useState('');
    const [anioError, setAnioError] = useState('');
    
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

    const openModal = (op, id, descripcion, costo, numeroRelease, version, fabricante, nombre, anio, fechaOtorgamiento, fechaVencimiento) =>{  
        setDescripcion('');
        setCosto('')
        setOperation(op);
        setVersion('');
        setNumeroRelease('');
        setNombre('');
        setFabricante('');
        setFechaOtorgamiento('');
        setFechaVencimiento('');
        setAnio('');

        if(op === 1){
            setTitle('Registrar licencia');
            setId(idFinanciamiento);  
            setDescripcion('');
            setCosto('');
            setVersion('');
            setNumeroRelease('');
            setNombre('');
            setFabricante('');
            setFechaOtorgamiento('');
            setFechaVencimiento('');
            setAnio('');
        }
        else if(op === 2){
            setTitle('Editar licencia');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setVersion(version);
            setNumeroRelease(numeroRelease);
            setNombre(nombre);
            setFabricante(fabricante);
            setFechaOtorgamiento(fechaOtorgamiento);
            setFechaVencimiento(fechaVencimiento);
            setAnio(anio);
        }       
        else if(op === 3){
            setTitle('Detalles de licencia');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setVersion(version);
            setNumeroRelease(numeroRelease);
            setNombre(nombre);
            setFabricante(fabricante);
            setFechaOtorgamiento(fechaOtorgamiento);
            setFechaVencimiento(fechaVencimiento);
            setAnio(anio);
        }
    }

    const limpiarErrores = () => {
        setCostoError('');
        setDescripcionError('');
        setOtorgamientoError('');
        setVencimientoError('');
        setAnioError('');
    }

    const validarLicencia = () => {
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
        if(anio === null || anio === ''){
            setAnioError('Debe seleccionar el año');
            enviar = false;
        }
        else if(anio > Date.now()){
            setAnioError('El año de la licencia no puede ser posterior al año corriente')
            enviar = false;
        }
        if(fechaOtorgamiento === null || fechaOtorgamiento === ''){
            setOtorgamientoError('Debe seleccionar una fecha de otorgamiento');
            enviar = false;
        }
        else if(fechaOtorgamiento > Date.now()){
            setOtorgamientoError('La fecha de otorgamiento no puede ser posterior a la fecha actual')
            enviar = false;
        }
        if(fechaVencimiento === null || fechaVencimiento === ''){
            setVencimientoError('Debe seleccionar una fecha de vencimiento');
            enviar = false;
        }
        else if(fechaOtorgamiento > fechaVencimiento){
            setVencimientoError('La fecha de vencimiento no puede ser anterior al otorgamiento')
            enviar = false;
        }
        if (enviar) {
            if(operation === 1){
                parametros= {
                    fabricante:fabricante.trim(),
                    version:version.trim(),
                    nombre:nombre.trim(),
                    numero_release:numeroRelease.trim(),
                    descripcion: descripcion.trim(),
                    anio: format(anio, 'yyyy-MM-dd'),
                    fecha_otorgamiento: format(fechaOtorgamiento, 'yyyy-MM-dd'),
                    fecha_vencimiento: format(fechaVencimiento, 'yyyy-MM-dd'),
                    costo:costo};
                metodo= 'POST';
            }
            else{
                parametros={
                    id:id,fabricante:fabricante.trim(),
                    version:version.trim(),
                    nombre:nombre.trim(),
                    numero_release:numeroRelease.trim(),
                    descripcion: descripcion.trim(),
                    anio: format(anio, 'yyyy-MM-dd'),
                    fecha_otorgamiento: format(fechaOtorgamiento, 'yyyy-MM-dd'),
                    fecha_vencimiento: format(fechaVencimiento, 'yyyy-MM-dd'),
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
            {label: 'Version', field: 'version'},
            {label: 'Release', field: 'release'},
            {label: 'Fabricante', field: 'fabricante'},
            {label: 'Año', field: 'anio'},
            {label: 'Otorgamiento', field: 'fechaOtorgamiento'},
            {label: 'Vencimiento', field: 'fechaVencimiento'},
            {label: 'Acciones', field: 'acciones'}           
          ],
        rows: []
    };

    rowsWithRowNumber.forEach(adquisicion => {
        data.rows.push({
            rowNumber: adquisicion.rowNumber,
            descripcion: adquisicion.descripcion,
            costo: adquisicion.costo,
            version: adquisicion.version,
            release: adquisicion.numero_release,
            fabricante: adquisicion.fabricante,
            anio: adquisicion.anio.substring(0,4),
            fechaOtorgamiento: adquisicion.fecha_otorgamiento,
            fechaVencimiento: adquisicion.fecha_vencimiento,
            acciones: (    
            <td >
                <button onClick={() => openModal(
                    3,
                    adquisicion.id,
                    adquisicion.descripcion,
                    adquisicion.costo,
                    adquisicion.numero_release,
                    adquisicion.version,
                    adquisicion.fabricante,
                    adquisicion.nombre,
                    adquisicion.anio,
                    adquisicion.fecha_otorgamiento,
                    adquisicion.fecha_vencimiento
                    )}
                     className='btn btn-secondary' data-bs-toggle='modal' data-bs-target={'#modalProducts-licencias-ver'}>
                    <i className='fa-solid fa-eye'></i>
                </button>
                &nbsp; 
                <button onClick={() => openModal(
                    2,
                    adquisicion.id,
                    adquisicion.descripcion,
                    adquisicion.costo,
                    adquisicion.numero_release,
                    adquisicion.version,
                    adquisicion.fabricante,
                    adquisicion.nombre,
                    adquisicion.anio,
                    adquisicion.fecha_otorgamiento,
                    adquisicion.fecha_vencimiento
                    )}
                     className='btn btn-warning' data-bs-toggle='modal' data-bs-target={'#modalProducts-licencias'}>
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
                    <button onClick={()=> openModal(1)} className='col-md-3 offset-md-8 btn btn-success' data-bs-toggle='modal' data-bs-target={'#modalProducts-licencias'}>
                        <i className='fa-solid fa-circle-plus'>
                        </i> Agregar
                    </button>    
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
                            <input type='text' id='descripcion' className={`form-control ${descripcionError ? 'is-invalid' : ''}`} placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        {descripcionError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{descripcionError}</div>}
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
                            <input type='text' id='precio' className={`form-control ${costoError ? 'is-invalid' : ''}`} placeholder='Precio' value={costo}
                            onChange={(e)=> setCosto(e.target.value)}></input>
                        </div>
                        {costoError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{costoError}</div>}
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                                <DatePicker
                                    selected={anio}
                                    value={anio}
                                    onChange={(date) => setAnio(date)}
                                    className={`form-control ${anioError ? 'is-invalid' : ''}`}
                                    placeholderText='Año'
                                    showYearPicker
                                    dateFormat="yyyy"
                                />
                        </div>  
                        {anioError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{anioError}</div>}                              
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                                <DatePicker
                                    selected={fechaOtorgamiento}
                                    value={fechaOtorgamiento}
                                    onChange={(date) => setFechaOtorgamiento(date)}
                                    className={`form-control ${otorgamientoError ? 'is-invalid' : ''}`}
                                    placeholderText='Fecha otorgamiento'
                                    dateFormat="yyyy-MM-dd"
                                />
                        </div>  
                        {otorgamientoError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{otorgamientoError}</div>}                               
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                                <DatePicker
                                    selected={fechaVencimiento}
                                    value={fechaVencimiento}
                                    onChange={(date) => setFechaVencimiento(date)}
                                    className={`form-control ${vencimientoError ? 'is-invalid' : ''}`}
                                    placeholderText='Fecha vencimiento'
                                    dateFormat="yyyy-MM-dd"
                                />
                        </div>  
                        {vencimientoError && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{vencimientoError}</div>}                                                              
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validarLicencia()} className='btn btn-success'>
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
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                            <input type='text' id='anio' className='form-control' placeholder='Año' value={anio || '' }
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                            <input type='text' id='fechaOtorgamiento' className='form-control' placeholder='Fecha de otorgamiento' value={fechaOtorgamiento || '' }
                            ></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-regular fa-calendar-days'></i></span>
                            <input type='text' id='fechaVencimiento' className='form-control' placeholder='Fecha de vencimiento' value={fechaVencimiento || '' }
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
    </div>
  )
}


import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiDeleteAdquisicion, apiGetAdquisiciones, apiGetFinanciamiento, apiPostAdquisicion } from '../axios/axios';
import { show_alerta } from '../functions';

export const Equipamientos = ({ actualizarFinanciamiento }) => {
    const [effect, setEffect] = useState(false);
    const {idFinanciamiento, motivoFinanciamiento, montoFinanciamiento} = useParams();
    const urlAdquisiciones = `http://localhost:8080/equipamientos/financiamiento/${idFinanciamiento}`;
    const url = 'http://localhost:8080/equipamientos'
    const [adquisiciones, setAdquisiciones]= useState([]);
    // const [financiamiento, setFinanciamiento]= useState({});
    const [id, setId]= useState('');
    const [descripcion, setDescripcion]= useState('');
    const [costo, setCosto]= useState('');
    const [fechaIncorporacion, setFechaIncorporacion] = useState('');
    const [operation, setOperation]= useState(1);
    const [title, setTitle]= useState('');
    const [denominacion, setDenominacion]= useState('');
    const [tipo, setTipo]= useState('');
    
    
    const adquisicionesList = adquisiciones.content || [];
    const rowsWithRowNumber = adquisicionesList.map((row, index) => ({ ...row, rowNumber: index + 1 }));

    useEffect(() => {
        getAdquisiciones();
        // getFinanciamiento();
        setEffect(false);
    }, [effect]);


    const getAdquisiciones = async () => {
        const respuesta = await apiGetAdquisiciones(urlAdquisiciones);
        setAdquisiciones(respuesta.data);  
    }

    // const getFinanciamiento = async () => {
    //     const respuesta = await apiGetFinanciamiento('http://localhost:8080/fuentes-financiamiento/' + idFinanciamiento);
    //     setFinanciamiento(respuesta.data);  
    // }

    const openModal = (op, id, descripcion, costo, denominacion, fechaIncorporacion) =>{
       
        setDescripcion('');
        setCosto('');
        setOperation(op);
        setDenominacion('');
        setFechaIncorporacion('');

        if(op === 1){
            setTitle('Registrar adquisicion');
            setId(idFinanciamiento);  
            setDescripcion('');
            setCosto('');
            setDenominacion('');  
            setFechaIncorporacion('');        
        }
        else if(op === 2){
            setTitle('Editar adquisicion');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setDenominacion(denominacion);
            setFechaIncorporacion(fechaIncorporacion);
        }
        
        else if(op === 3){
            setTitle('Detalles de la adquisicion');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setDenominacion(denominacion);
            setFechaIncorporacion(fechaIncorporacion);
        }   
    }

   

    const validarEquipamiento = () => {
        var parametros;
        var metodo;
        if(descripcion.trim() === ''){
            show_alerta('Escriba la descripcion de la adquisicion','warning');
        }
        else if(costo === ''){
            show_alerta('Escriba el precio de la adquisicion','warning');
        }
        else{
            if(operation === 1){
                parametros= {
                    denominacion:denominacion.trim(),
                    descripcion: descripcion.trim(),
                    fecha_incorporacion: fechaIncorporacion,
                    costo:costo};
                metodo= 'POST';
            }
            else{
                parametros={
                    id:id,
                    denominacion:denominacion.trim(),
                    descripcion: descripcion.trim(),
                    fecha_incorporacion: fechaIncorporacion,
                    costo:costo};
                metodo= 'PUT';
            }
            enviarSolicitud(metodo,parametros);
        }
    }

    

    const enviarSolicitud = async(metodo, parametros) => {
        await apiPostAdquisicion({ method: metodo, url: `${url}/${id}`, data: parametros }).then((respuesta) => {
            console.log(respuesta)
            show_alerta(metodo==='POST'? 'Adquisicion agregada' : 'Adquisicion modificada', tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getAdquisiciones();
            }
            setEffect(true);
            actualizarFinanciamiento(true);
        })
        .catch(function(error){
            show_alerta('Error en la solicitud','error');
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
                    adquisicion.fechaIncorporacion
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
                    adquisicion.fechaIncorporacion
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
         {/* <h1 className='col-0 col-lg-12 offset-0 offset-lg-0 d-grid justify-items-start fw-lighter' style={{ fontSize: '18px', color: 'Dimgrey', textAlign: 'left', marginBottom: "20px" }}>
            <th >
            Fuente de financiamiento: <span className="fw-lighter">{motivoFinanciamiento}</span> 
            </th> 
            <th>
            Monto disponible: $<span className="fw-lighter">{financiamiento.monto}</span>
            </th>     
                     
        </h1> */}
        
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
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='denominacion' className='form-control' placeholder='Denominacion' value={denominacion}
                            onChange={(e)=> setDenominacion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='fechaIncorporacion' className='form-control' placeholder='Fecha Incorporacion' value={fechaIncorporacion}
                            onChange={(e)=> setFechaIncorporacion(e.target.value)}></input>
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
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='fechaIncorporacion' className='form-control' placeholder='Fecha Incorporacion' value={fechaIncorporacion || '' }
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

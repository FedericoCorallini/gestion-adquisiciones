import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiDeleteAdquisicion, apiGetAdquisiciones, apiGetFinanciamiento, apiPostAdquisicion } from '../axios/axios';
import { show_alerta } from '../functions';

export const Servicios = ({ actualizarFinanciamiento }) => {
    const [effect, setEffect] = useState(false);
    const {idFinanciamiento} = useParams();
    const urlAdquisiciones = `http://localhost:8080/servicios/financiamiento/${idFinanciamiento}`;
    const url = 'http://localhost:8080/servicios'
    const [adquisiciones, setAdquisiciones]= useState([]);
    const [id, setId]= useState('');
    const [descripcion, setDescripcion]= useState('');
    const [tipo, setTipo]= useState('');
    const [costo, setCosto]= useState('');
    const [operation, setOperation]= useState(1);
    const [title, setTitle]= useState('');
    
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

    const openModal = (op, id, tipo, descripcion, costo) =>{
    
        setDescripcion('');
        setCosto('');
        setOperation(op);
        setTipo('');
        
        if(op === 1){
            setTitle('Registrar adquisicion');
            setId(idFinanciamiento);  
            setDescripcion('');
            setCosto('');
            setTipo('');            
        }

        else if(op === 2){
            setTitle('Editar adquisicion');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setTipo(tipo); 
        }
        
        else if(op === 3){
            setTitle('Detalles de la adquisicion');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            setTipo(tipo);
        }    
    }

    const validarServicio = () => {
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
                parametros= {tipo:tipo.trim(),descripcion: descripcion.trim(),costo:costo};
                metodo= 'POST';
            }
            else{
                parametros={id:id,tipo:tipo.trim(),descripcion: descripcion.trim(),costo:costo};
                metodo= 'PUT';
            }
            enviarSolicitud(metodo,parametros);
        }
    }



    const enviarSolicitud = async(metodo, parametros) => {
        await apiPostAdquisicion({ method: metodo, url: `${url}/${id}`, data: parametros }).then((respuesta) => {
            show_alerta(metodo==='POST'? 'Adquisicion agregada' : 'Adquisicion modificada', tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getAdquisiciones();
            }
            setEffect(true);
            actualizarFinanciamiento(true);
        })
        .catch(function(error){
            console.log(error.response.data.error)
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
            tipo: adquisicion.tipo,
            acciones: (    
            <td >
                <button onClick={() => openModal(
                    3,
                    adquisicion.id,
                    adquisicion.tipo,
                    adquisicion.descripcion,
                    adquisicion.costo,
                    )}
                     className='btn btn-secondary' data-bs-toggle='modal' data-bs-target={'#modalProducts-servicios-ver'}>
                    <i className='fa-solid fa-eye'></i>
                </button>
                &nbsp; 
                <button onClick={() => openModal(
                    2,
                    adquisicion.id,
                    adquisicion.tipo,
                    adquisicion.descripcion,
                    adquisicion.costo
                    )}
                     className='btn btn-warning' data-bs-toggle='modal' data-bs-target={'#modalProducts-servicios'}>
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
                    <button onClick={()=> openModal(1)} className='col-md-3 offset-md-8 btn btn-success' data-bs-toggle='modal' data-bs-target={'#modalProducts-servicios'}>
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
       
        
    </div>
  )
}

import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import { useParams } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody, MDBTabs, MDBTabsItem, MDBTabsLink} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'; 

const ShowEquipamientos = () => {
    const {idFinanciamiento, motivoFinanciamiento, montoFinanciamiento} = useParams();
    const [selectedOption, setSelectedOption] = useState('servicios');
    const urlAdquisiciones=`http://localhost:8080/equipamientos/financiamiento/${idFinanciamiento}`;
    const url='http://localhost:8080/equipamientos'
    const [adquisiciones, setAdquisiciones]= useState([]);
    const [id, setId]= useState('');
    const [descripcion, setDescripcion]= useState('');
    const [tipo, setTipo]= useState('');
    const [costo, setCosto]= useState('');
    const [operation, setOperation]= useState(1);
    const [title, setTitle]= useState('');
    const [denominacion, setDenominacion]= useState('');
    const [isbn, setIsbn]=useState('');
    const [issn, setIssn]=useState('');
    const [nombreAutor, setNombreAutor]=useState('');
    const [apellidoAutor, setApellidoAutor]=useState('');
    const [editorial, setEditorial]=useState('');
    const [titulo, setTitulo]=useState('');
    const [urlBiliografia, setUrlBibliografia]=useState('');
    const [fabricante, setFabricante]=useState('');
    const [nombre, setNombre]=useState('');
    const [numeroRelease, setNumeroRelease]=useState('');
    const [version, setVersion]=useState('');
    
    const adquisicionesList = adquisiciones.content || [];
    const rowsWithRowNumber = adquisicionesList.map((row, index) => ({ ...row, rowNumber: index + 1 }));

    const [fillActive, setFillActive] = useState('servicios');

    const handleFillClick = (value) => {
    if (value === fillActive) {
        return;
    }
    
    setSelectedOption(value)
    setFillActive(value);
    };


    useEffect( ()=>{
        getAdquisiciones();
    },[selectedOption]);


    const getAdquisiciones = async () => {
        const respuesta = await axios.get(urlAdquisiciones);
        setAdquisiciones(respuesta.data);  
    }

    const openModal = (op, id, tipo, descripcion, costo, denominacion, nombreAutor, apellidoAutor, editorial, issn, isbn, titulo, urlBiliografia, numeroRelease, version, fabricante, nombre, selectedOption) =>{
        
        setOperation(op);
        if(op === 1){
            setTitle('Registrar Producto');
            setId(idFinanciamiento);  
            setDescripcion('');
            setCosto('');

            if(selectedOption === 'servicios'){
                setTipo('');
            }
            else if(selectedOption === 'equipamientos'){
                setDenominacion('');
            }
            else if(selectedOption === 'licencias'){
                setVersion('');
                setNumeroRelease('');
                setNombre('');
                setFabricante('');
            }
            else if(selectedOption === 'bibliografias'){
                setUrlBibliografia('');
                setTitulo('');
                setEditorial('');
                setApellidoAutor('');
                setIssn('');
                setIsbn('');
                setNombreAutor('');
            }
            
        }
        else if(op === 2){
            setTitle('Editar Producto');
            setId(id);
            setDescripcion(descripcion);
            setCosto(costo);
            if(selectedOption === 'servicios'){
                setTipo(tipo);
            }
            else if(selectedOption === 'equipamientos'){
                setDenominacion(denominacion);
            }
            else if(selectedOption === 'licencias'){
                setVersion(version);
                setNumeroRelease(numeroRelease);
                setNombre(nombre);
                setFabricante(fabricante);
            }
            else if(selectedOption === 'bibliografias'){
                setUrlBibliografia(urlBiliografia);
                setTitulo(titulo);
                setEditorial(editorial);
                setApellidoAutor(apellidoAutor);
                setIssn(issn);
                setIsbn(isbn);
                setNombreAutor(nombreAutor);
            }
            
            
          
        }

        window.setTimeout(function(){
            document.getElementById('descripcion').focus();
        },500);

    
    }

    const validarServicio = () => {
        var parametros;
        var metodo;
        if(descripcion.trim() === ''){
            show_alerta('Escriba la descripcion del producto','warning');
        }
        else if(costo === ''){
            show_alerta('Escribe el precio del producto','warning');
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

    const validarLicencia = () => {
        var parametros;
        var metodo;
        if(descripcion.trim() === ''){
            show_alerta('Escriba la descripcion del producto','warning');
        }
        else if(costo === ''){
            show_alerta('Escribe el precio del producto','warning');
        }
        else{
            if(operation === 1){
                parametros= {fabricante:fabricante.trim(),version:version.trim(),nombre:nombre.trim(),numeroRelease:numeroRelease.trim(),descripcion: descripcion.trim(),costo:costo};
                metodo= 'POST';
            }
            else{
                parametros={id:id,fabricante:fabricante.trim(),version:version.trim(),nombre:nombre.trim(),numeroRelease:numeroRelease.trim(),descripcion: descripcion.trim(),costo:costo};
                metodo= 'PUT';
            }
            enviarSolicitud(metodo,parametros);
        }
    }

    const validarEquipamiento = () => {
        var parametros;
        var metodo;
        if(descripcion.trim() === ''){
            show_alerta('Escriba la descripcion del producto','warning');
        }
        else if(costo === ''){
            show_alerta('Escribe el precio del producto','warning');
        }
        else{
            if(operation === 1){
                parametros= {denominacion:denominacion.trim(),descripcion: descripcion.trim(),costo:costo};
                metodo= 'POST';
            }
            else{
                parametros={id:id,denominacion:denominacion.trim(),descripcion: descripcion.trim(),costo:costo};
                metodo= 'PUT';
            }
            enviarSolicitud(metodo,parametros);
        }
    }

    const validarBibliografia = () => {
        var parametros;
        var metodo;
        if(descripcion.trim() === ''){
            show_alerta('Escriba la descripcion del producto','warning');
        }
        else if(costo === ''){
            show_alerta('Escribe el precio del producto','warning');
        }
        else{
            if(operation === 1){
                parametros= {editorial:editorial.trim(),nombreAutor:nombreAutor.trim(),apellidoAutor:apellidoAutor.trim(),isbn:isbn.trim(),issn:issn.trim(),titulo:titulo.trim(),url:urlBiliografia.trim(),descripcion: descripcion.trim(),costo:costo};
                metodo= 'POST';
            }
            else{
                parametros={id:id,editorial:editorial.trim(),nombreAutor:nombreAutor.trim(),apellidoAutor:apellidoAutor.trim(),isbn:isbn.trim(),issn:issn.trim(),titulo:titulo.trim(),url:urlBiliografia.trim(),descripcion: descripcion.trim(),costo:costo};
                metodo= 'PUT';
            }
            enviarSolicitud(metodo,parametros);
        }
    }

    const enviarSolicitud = async(metodo,parametros) => {
        await axios({ method:metodo, url: `${url}/${id}`, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alerta(msj,tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getAdquisiciones();
            }
        })
        .catch(function(error){
            show_alerta('Error en la solicitud','error');
            console.log(error);
        });
    }

    const deleteProduct= (id) =>{
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿Seguro de eliminar el producto ?',
            icon: 'question',text:'No se podrá dar marcha atrás',
            showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
        }).then((result) =>{
            if(result.isConfirmed){
                setId(id);
                enviarSolicitud('DELETE',{id:id});
            }
            else{
                show_alerta('El producto NO fue eliminado','info');
            }
        });
    }

    
    const data = {
        columns: [
            {label: 'Numero', field: 'rowNumber'},
            {label: 'Descripcion', field: 'descripcion'},
            {label: 'Precio', field: 'costo'},
            {label: 'Acciones', field: 'acciones'}
          ],
        rows: []
    };

    rowsWithRowNumber.forEach(adquisicion => {
        data.rows.push({
            rowNumber: adquisicion.rowNumber,
            descripcion: adquisicion.descripcion,
            costo: adquisicion.costo,
            acciones: (    
            <td>
                <button onClick={() => openModal(
                    2,
                    adquisicion.id,
                    adquisicion.tipo,
                    adquisicion.descripcion,
                    adquisicion.costo,
                    adquisicion.denominacion,
                    adquisicion.nombreAutor,
                    adquisicion.apellidoAutor,
                    adquisicion.editorial,
                    adquisicion.issn,
                    adquisicion.isbn,
                    adquisicion.titulo,
                    adquisicion.urlBiliografia,
                    adquisicion.numeroRelease,
                    adquisicion.version,
                    adquisicion.fabricante,
                    adquisicion.nombre,
                    selectedOption
                    )}
                     className='btn btn-warning' data-bs-toggle='modal' data-bs-target={`#modalProducts-${selectedOption}`}>
                    <i className='fa-solid fa-edit'></i>
                </button>
                &nbsp; 
                <button onClick={()=>deleteProduct(adquisicion.id)} className='btn btn-danger'>
                    <i className='fa-solid fa-trash'></i>
                </button>
            </td>)
        })
    });

   

  return (
    <div className='App'>
         <h1 className='col-0 col-lg-12 offset-0 offset-lg-0 d-grid justify-items-start fw-lighter' style={{ fontSize: '18px', color: 'Dimgrey', textAlign: 'left', marginBottom: "20px" }}>
            <th >
            Fuente de financiamiento: <span className="fw-lighter">{motivoFinanciamiento}</span> 
            </th> 
            <th>
            Monto disponible: $<span className="fw-lighter">{montoFinanciamiento}</span>
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
        
        <div className='row mt-3'>
            <div className='col-lg-10 offset-lg-1'>
            <MDBDataTable 
             hover
             data={data}
             // striped
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

            {/* <div className='container-fluid'>
            <div className='col-md-3 offset-md-8'>
                <div className='d-grid mx-auto'>
                    <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target={`#modalProducts-${selectedOption}`}>
                        <i className='fa-solid fa-circle-plus'>
                        </i> Agregar
                    </button>
                </div>
            </div>
            </div> */}

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
                            <input type='text' id='tipo' className='form-control' placeholder='Tipo' value={tipo}
                            onChange={(e)=> setTipo(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
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
                            <button onClick={() => validarEquipamiento()} className='btn btn-success'>
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
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
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
    </div>
  )
}

export default ShowEquipamientos
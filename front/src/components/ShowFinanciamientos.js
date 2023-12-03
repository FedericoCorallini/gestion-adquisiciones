import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact'; 
import { keycloak } from '../keycloak';


const ShowFinanciamientos = () => {
    const urlFinanciamientos='http://localhost:8080/fuentes-financiamiento';
    const [financiamientos, setFinanciamientos]= useState([]);
    const [id, setId]= useState('');
    const financiamientosList = financiamientos.content || [];
    const rowsWithRowNumber = financiamientosList.map((row, index) => ({ ...row, rowNumber: index + 1 }));

    useEffect( ()=>{
        getFinanciamientos();
    },[]);
  
    const getFinanciamientos = async () => {
        const token = keycloak.token;
        const respuesta = await axios.get(urlFinanciamientos,
            // {
            //     withCredentials: true,
            //     mode: 'cors',
            //     headers: {
            //       'Authorization': `Bearer ${token}`,
            //       'Acces-Control-Allow-Origin':'*'
            //     },
            // }
            );
        setFinanciamientos(respuesta.data);
    }

    const data = {
        columns: [
            {label: 'Numero', field: 'rowNumber'},
            {label: 'Monto disponible', field: 'monto'},
            {label: 'Motivo', field: 'motivo'},
            {label: 'Fecha de acreditacion', field: 'fecha_acreditacion'},
            {label: 'Seleccionar', field: 'seleccionar'}
          ],
        rows: []
    };
    rowsWithRowNumber.forEach(financiamiento => {
        data.rows.push({
            rowNumber: financiamiento.rowNumber,
            monto: financiamiento.monto,
            motivo: financiamiento.motivo,
            fecha_acreditacion: financiamiento.fecha_acreditacion,
            seleccionar: (    
            <td>
                <Link to={`/${financiamiento.id}/${financiamiento.motivo}/${financiamiento.monto}`} className="col-lg-12 btn btn-primary offset-lg-0">
                    <i className="fa fa-arrow-right"></i>
                </Link>
            </td>)
        })
    });
  return (
    <div className='App'>
        <div className='row mt-3'>
            <div className='col-12 col-lg-10 offset-0 offset-lg-1'>
                <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    FUENTES DE FINANCIAMIENTO DISPONIBLES
                </h1>
                <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                    Seleccione la fuente de financiamiento sobre la que desea gestionar las adquisiciones
                    
                </h1>
            
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
{/*       
                <MDBTable hover >
                    <MDBTableHead light >
                    <tr><th>Financiamientos</th><th>Descripcion</th><th>Monto</th><th>Motivo</th><th>Ingresar</th></tr>
                    </MDBTableHead>
                    <MDBTableBody>
                                {financiamientosList.map((financiamiento,i)=>(
                                    <tr key={financiamiento.id}>
                                        <td>{(i+1)}</td>
                                        <td>{financiamiento.fecha_acreditacion}</td>
                                        <td>${new Intl.NumberFormat('es-ar').format(financiamiento.monto)}</td>
                                        <td>{financiamiento.motivo}</td>
                                        <td>
                                            <Link to={`/${financiamiento.id}`} className="col-md-5 btn btn-primary ">
                                                <i className="fa fa-arrow-right"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                                } 
                    </MDBTableBody>
                </MDBTable> */}
            </div>
        </div>
    </div>
  )
}

export default ShowFinanciamientos
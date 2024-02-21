import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact'; 
import { keycloak } from '../keycloak';
import { apiGetFinancimientos } from '../axios/axios';
import { useToken } from '../hooks/TokenProvider';
import { format, parseISO } from 'date-fns';
// import 'mdbreact/dist/css/mdb.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

const ShowFinanciamientos = () => {
    const [financiamientos, setFinanciamientos] = useState([]);  
    const [id, setId]= useState('');
    const financiamientosList = financiamientos.content || [];
    const rowsWithRowNumber = financiamientosList.map((row, index) => ({ ...row, rowNumber: index + 1 }));

    useEffect(() => {
        console.log(localStorage.getItem('jwt'))
        getFinanciamientos();
    },[]);
  
    const getFinanciamientos = async () => {
        const respuesta = await apiGetFinancimientos();
        setFinanciamientos(respuesta.data);
    }

    const data = {
        columns: [
            {label: 'Numero', field: 'rowNumber'},
            {label: 'Motivo', field: 'motivo'},
            {label: 'Monto disponible', field: 'monto'},
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
            fecha_acreditacion: format(parseISO(financiamiento.fecha_acreditacion), 'dd/MM/yyyy'),
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
            </div>
        </div>
    </div>
  )
}

export default ShowFinanciamientos;
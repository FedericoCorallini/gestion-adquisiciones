import { format, parseISO } from 'date-fns';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGetFinancimientos } from '../axios/axios';

const ShowFinanciamientos = () => {
    const [financiamientos, setFinanciamientos] = useState([]);
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
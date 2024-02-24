import { MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetFinanciamiento } from '../axios/axios';
import { Bibliografias } from './Bibliografias';
import { Equipamientos } from './Equipamientos';
import { Licencias } from './Licencias';
import { Servicios } from './Servicios';

const ShowAdquisiciones = () => {
    const [effect, setEffect] = useState(false);
    const {idFinanciamiento, motivoFinanciamiento} = useParams();
    const [selectedOption, setSelectedOption] = useState('servicios');
    const [financiamiento, setFinanciamiento]= useState({});

    const [fillActive, setFillActive] = useState('servicios');

    const handleFillClick = (value) => {
        if (value === fillActive) {
            return;
        }
    setSelectedOption(value)
    setFillActive(value);
    };
    
    useEffect(() => {
        getFinanciamiento();
        setEffect(false);
    }, [selectedOption, effect]);

    const getFinanciamiento = async () => {
        const respuesta = await apiGetFinanciamiento('http://localhost:8080/fuentes-financiamiento/' + idFinanciamiento);
        setFinanciamiento(respuesta.data);  
    }

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
    </div>
  )
}

export default ShowAdquisiciones
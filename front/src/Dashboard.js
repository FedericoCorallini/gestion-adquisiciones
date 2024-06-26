import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Dashboard.css';
import ShowAsquisiciones from './components/ShowAdquisiciones';
import ShowFinanciamientos from './components/ShowFinanciamientos';
import { initKeycloak, keycloak } from './nuevoKeycloak';


function Dashboard() {
    const [style] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const handleLogout = () => {
        window.location.href='http://localhost:3000/';
        initKeycloak();
        keycloak.logout({ redirectUri: 'http://localhost:3000/' })
      };

    return (
        <div>
            <body id="page-top">

                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">

                    {/*  <!-- Sidebar --> */}
                    <ul className={style} id="accordionSidebar">

                        {/*  <!-- Sidebar - Brand --> */}
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                            <div className="sidebar-brand-text mx-3">GIUCT</div>
                            <div className="text-center d-none d-md-inline">
                        </div>
                        </a>

                        {/*   <!-- Divider --> */}
                        <hr className="sidebar-divider my-0" />

                        {/*   <!-- Heading --> */}
                        <div className="sidebar-heading">
                            MODULOS ADMINISTRATIVOS
                        </div>

                        {/*  <!-- Nav Item - Tables --> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/index">
                                <i className="fas fa-fw fa-table"></i>
                                <span>Adquisiciones</span></a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/index">
                                <i className="fas fa-fw fa-table"></i>
                                <span>Fuentes de financiamiento</span></a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/index">
                                <i className="fas fa-fw fa-table"></i>
                                <span>Recursos humanos</span></a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/index">
                                <i className="fas fa-fw fa-table"></i>
                                <span>Proyectos</span></a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/index">
                                <i className="fas fa-fw fa-table"></i>
                                <span>Comunicaciones cientificas</span></a>
                        </li>
                     

                    </ul>
                 
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/*  <!-- Main Content --> */}
                        <div id="content">
                            {/*  <!-- Topbar --> */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                {/*  <!-- Topbar Navbar --> */}
                                <ul className="navbar-nav ml-auto">
                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    {/* <!-- Nav Item - User Information --> */}
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <a onClick={handleLogout}>
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Cerrar Sesion</span>
                                            </a>
                                            <img className="img-profile rounded-circle"
                                                src="img/undraw_profile.svg" />
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">
                            <BrowserRouter>
                                <Routes>
                                    <Route path='/:idFinanciamiento/:motivoFinanciamiento/:montoFinanciamiento' element={<ShowAsquisiciones></ShowAsquisiciones>}></Route>
                                    <Route path='/index' element={<ShowFinanciamientos></ShowFinanciamientos>}></Route>
                                </Routes>
                            </BrowserRouter>
                            </div>
                        </div>
                    </div>
                </div>                
            </body>
        </div>
    )
}

export default Dashboard;
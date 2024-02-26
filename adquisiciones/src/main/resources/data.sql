INSERT INTO fuente_financiamiento (`id`,`fecha_acreditacion`,`monto`,`motivo`) VALUES (1,'2024-01-01',2000000,'UCT');
INSERT INTO fuente_financiamiento (`id`,`fecha_acreditacion`,`monto`,`motivo`) VALUES (2,'2024-01-02',5000000,'PID');
INSERT INTO servicio (`id`,`borrado`,`costo`,`descripcion`,`tipo`,`id_fuente_financiamiento`) VALUES (1,false,100,'Servicio uno','un tipo',1);
INSERT INTO servicio (`id`,`borrado`,`costo`,`descripcion`,`tipo`,`id_fuente_financiamiento`) VALUES (2,false,1,'Servicio dos','otro tipo',2);
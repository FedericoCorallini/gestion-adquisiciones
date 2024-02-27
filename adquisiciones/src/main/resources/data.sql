INSERT IGNORE INTO fuente_financiamiento (`id`,`fecha_acreditacion`,`monto`,`motivo`) VALUES (1,'2024-01-01',2000000,'UCT');
INSERT IGNORE INTO fuente_financiamiento (`id`,`fecha_acreditacion`,`monto`,`motivo`) VALUES (2,'2024-01-02',5000000,'PID');
INSERT IGNORE INTO servicio (`id`,`borrado`,`costo`,`descripcion`,`tipo`,`id_fuente_financiamiento`) VALUES (1,false,10000,'Reparacion de equipo','Service',1);
INSERT IGNORE INTO servicio (`id`,`borrado`,`costo`,`descripcion`,`tipo`,`id_fuente_financiamiento`) VALUES (2,false,4000,'Viajes a congresos','Transporte',2);
INSERT IGNORE INTO servicio (`id`,`borrado`,`costo`,`descripcion`,`tipo`,`id_fuente_financiamiento`) VALUES (3,false,8000,'Mantenimiento de software','Service',1);
INSERT IGNORE INTO servicio (`id`,`borrado`,`costo`,`descripcion`,`tipo`,`id_fuente_financiamiento`) VALUES (4,false,6000,'Capacitación en desarrollo','Capacitacion',2);
INSERT IGNORE INTO bibliografia (`id`,`borrado`,`costo`,`descripcion`,`anio_publicacion`,`apellido_autor`,`editorial`,`isbn`,`issn`,`nombre_autor`,`tipo`,`titulo`,`url`,`id_fuente_financiamiento`) VALUES (1,false,1000,'Biblografia diseño','2020-01-01','Gamma','Pearson','0-201-63361-2','','Erich','Libro','Design Patterns','',1);
INSERT IGNORE INTO bibliografia (`id`,`borrado`,`costo`,`descripcion`,`anio_publicacion`,`apellido_autor`,`editorial`,`isbn`,`issn`,`nombre_autor`,`tipo`,`titulo`,`url`,`id_fuente_financiamiento`) VALUES (2,false,50000,'Bibliografia diseño','2021-01-01','Larman','Pearson','84-205-3438-2','','Craig','Libro','UML y patrones','',1);
INSERT IGNORE INTO bibliografia (`id`,`borrado`,`costo`,`descripcion`,`anio_publicacion`,`apellido_autor`,`editorial`,`isbn`,`issn`,`nombre_autor`,`tipo`,`titulo`,`url`,`id_fuente_financiamiento`) VALUES (3,false,3500,'Bibliografia analisis','2020-01-01','Raumbaugh','Pearson','978-84-7829-087-1','','James','Libro','UML','',2);
INSERT IGNORE INTO bibliografia (`id`,`borrado`,`costo`,`descripcion`,`anio_publicacion`,`apellido_autor`,`editorial`,`isbn`,`issn`,`nombre_autor`,`tipo`,`titulo`,`url`,`id_fuente_financiamiento`) VALUES (4,false,2500,'Bibliografía desarrollo','2021-01-01','Smith','O Reilly','978-1492054059','','John','Libro','Clean Code','',2);
INSERT IGNORE INTO bibliografia (`id`,`borrado`,`costo`,`descripcion`,`anio_publicacion`,`apellido_autor`,`editorial`,`isbn`,`issn`,`nombre_autor`,`tipo`,`titulo`,`url`,`id_fuente_financiamiento`) VALUES (5,false,4200,'Bibliografía programación','2022-01-01','Johnson','Addison-Wesley','978-0321125217','','Michael','Libro','Code Complete','',1);
INSERT IGNORE INTO bibliografia (`id`,`borrado`,`costo`,`descripcion`,`anio_publicacion`,`apellido_autor`,`editorial`,`isbn`,`issn`,`nombre_autor`,`tipo`,`titulo`,`url`,`id_fuente_financiamiento`) VALUES (6,false,3500,'Bibliografía análisis avanzado','2023-01-01','Williams','Pearson','978-0132350884','','Martin','Libro','Agile Principles','',2);
INSERT IGNORE INTO equipamiento (`id`,`borrado`,`costo`,`descripcion`,`denominacion`,`fecha_incorporacion`,`id_fuente_financiamiento`) VALUES (1,false,10500.2,'Monitor','','2000-11-01',1);
INSERT IGNORE INTO equipamiento (`id`,`borrado`,`costo`,`descripcion`,`denominacion`,`fecha_incorporacion`,`id_fuente_financiamiento`) VALUES (2,false,116500.2,'Fotocopiadora','','2000-11-01',1);
INSERT IGNORE INTO equipamiento (`id`,`borrado`,`costo`,`descripcion`,`denominacion`,`fecha_incorporacion`,`id_fuente_financiamiento`) VALUES (3,false,9500.5,'Proyector','HD-2000','2005-05-10',1);
INSERT IGNORE INTO equipamiento (`id`,`borrado`,`costo`,`descripcion`,`denominacion`,`fecha_incorporacion`,`id_fuente_financiamiento`) VALUES (4,false,8900.7,'Impresora','LaserJet-500','2010-08-15',2);
INSERT IGNORE INTO equipamiento (`id`,`borrado`,`costo`,`descripcion`,`denominacion`,`fecha_incorporacion`,`id_fuente_financiamiento`) VALUES (5,false,7500.3,'Laptop','ThinkPad-X1','2018-03-20',1);
INSERT IGNORE INTO licencia (`id`,`borrado`,`costo`,`descripcion`,`anio`,`fabricante`,`fecha_otorgamiento`,`fecha_vencimiento`,`nombre`,`numero_release`,`version`,`id_fuente_financiamiento`) VALUES (1,false,50000,'Office','2022-01-01','Microsoft','2024-02-22','2026-02-20','Office','v1.0','version 1',1);
INSERT IGNORE INTO licencia (`id`,`borrado`,`costo`,`descripcion`,`anio`,`fabricante`,`fecha_otorgamiento`,`fecha_vencimiento`,`nombre`,`numero_release`,`version`,`id_fuente_financiamiento`) VALUES (2,false,30000,'Adobe Creative Suite','2023-01-01','Adobe','2024-01-15','2026-05-14','Creative Suite','v2.0','version 2',1);
INSERT IGNORE INTO licencia (`id`,`borrado`,`costo`,`descripcion`,`anio`,`fabricante`,`fecha_otorgamiento`,`fecha_vencimiento`,`nombre`,`numero_release`,`version`,`id_fuente_financiamiento`) VALUES (3,false,45000,'Autodesk AutoCAD','2022-01-01','Autodesk','2023-08-30','2025-08-29','AutoCAD','v2022','version 2022',2);
INSERT IGNORE INTO licencia (`id`,`borrado`,`costo`,`descripcion`,`anio`,`fabricante`,`fecha_otorgamiento`,`fecha_vencimiento`,`nombre`,`numero_release`,`version`,`id_fuente_financiamiento`) VALUES (4,false,38000,'VMware Workstation','2021-01-01','VMware','2022-04-18','2024-04-17','Workstation','v16.0','version 16',2);

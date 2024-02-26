# create databases
CREATE DATABASE IF NOT EXISTS `keycloak`;

# create root user and grant rights
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE USER 'keycloak_user'@'%' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON keycloak.* TO 'keycloak_user'@'%' WITH GRANT OPTION;

INSERT INTO adquisiciones.fuente_financiamiento (`id`,`fecha_acreditacion`,`monto`,`motivo`) VALUES (1,'2024-01-01',2000000,'UCT');
INSERT INTO adquisiciones.fuente_financiamiento (`id`,`fecha_acreditacion`,`monto`,`motivo`) VALUES (2,'2024-01-02',5000000,'PID');
INSERT INTO adquisiciones.servicios (`id`,`borrado`,`costo`,`descripcion`,`tipo`,`id_fuente_financiamiento`) VALUES (1,'0',100,'Servicio uno','un tipo',1);
INSERT INTO adquisiciones.servicios (`id`,`borrado`,`costo`,`descripcion`,`tipo`,`id_fuente_financiamiento`) VALUES (2,'0',1,'Servicio dos','otro tipo',2);
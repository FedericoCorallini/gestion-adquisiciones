# create databases
CREATE DATABASE IF NOT EXISTS `keycloak`;

# create root user and grant rights
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE USER 'keycloak_user'@'%' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON keycloak.* TO 'keycloak_user'@'%' WITH GRANT OPTION;
create database control_usuarios;
use control_usuarios;

create table roles (
id_rol int auto_increment primary key,
nombre varchar(50)
);

create table permisos(
id_permiso int auto_increment primary key,
nombre varchar(50),
descripcion text
);

create table rol_permiso(
id_rol_permiso int auto_increment primary key,
id_rol int,
permiso_id int,
foreign key (id_rol) references roles(id_rol),
foreign key (permiso_id) references permisos(id_permiso)
);

create table usuarios (
id_usuario int auto_increment primary key,
nombre varchar(100),
email varchar(300),
clave varchar(500),
id_rol int,
foreign key (id_rol) references roles(id_rol)
);

insert into roles (nombre) values
('Administrador'),
('Empleado');

insert into permisos (nombre, descripcion) values
('Crear', 'Permite crear nuevos registros'),
('Leer', 'Permite visualizar registros'),
('Actualizar', 'Permite modificar registros'),
('Eliminar', 'Permite eliminar registros');

-- asignar permisos al rol Administrador (id_rol = 1)

insert into rol_permiso (id_rol, permiso_id) values
(1, 1), -- Crear
(1, 2), -- Leer
(1, 3), -- Actualizar
(1, 4); -- Eliminar

-- asignar permisos al Empleado (id_rol = 2), solo leer
INSERT INTO rol_permiso (id_rol, permiso_id) VALUES 
(2, 2);

-- insertar usuario Empleado (contraseña 123456)
INSERT INTO usuarios (nombre, email, clave, id_rol)
VALUES 
('Admin', 'admin@gmail.com', '$2b$10$wLyuMd5mP.D5YekcUa2uSOQIRXvXFyKampz3go/ryHgHU1ihTtioa6',1);
-- la contraseña es: 1

-- insertar usuario Empleado (contraseña 123456)
INSERT INTO usuarios (nombre, email, clave, id_rol)
VALUES 
('Admin', 'admin@gmail.com', '$2b$10$wLyuMd5mP.D5YekcUa2uSOQIRXvXFyKampz3go/ryHgHU1ihTtioa6',1);
-- la contraseña es: 1

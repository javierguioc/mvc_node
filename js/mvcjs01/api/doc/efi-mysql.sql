--Crear Super usuario--
drop database if exists efi;

create database efi character set utf8 collate utf8_spanish_ci;

use efi;

-- habilita la actualizacion
SET
    SQL_SAFE_UPDATES = 0;

-- CREATE USER electiva PASSWORD '12345';
-- ALTER ROLE electiva WITH SUPERUSER;
--Tablas--
create table efi.persona(
    per_id varchar(20) not null,
    per_nombre varchar(50) not null,
    per_apellido varchar(50) not null,
    per_fecha_nacimiento date not null,
    per_direccion varchar(100),
    per_correo varchar (30) not null,
    primary key (per_id)
);

insert into
    efi.persona
values
    (
        '109245683',
        'carlos',
        'fuentes',
        '1980-01-20',
        'CR 5 N 247 pamplona',
        'carlos@hotmail.com'
    );

insert into
    efi.persona
values
    (
        '13345687',
        'daniel',
        'romero',
        '1993-05-20',
        'CR 6 N 247 pamplona',
        'daniel4@hotmail.com'
    );

insert into
    efi.persona
values
    (
        '10924567',
        'neimar',
        'fuentes',
        '2000-11-10',
        'CR 7 N 247 pamplona',
        'neimarfu@gmail.com'
    );

insert into
    efi.persona
values
    (
        '8850483',
        'monica',
        'latorre',
        '1990-05-18',
        'CR 8 N 247 pamplona',
        'monikita@yahoo.com'
    );

insert into
    efi.persona
values
    (
        '10947852',
        'pepito',
        'perez',
        '1998-06-02',
        'CR 9 N 247 pamplona',
        'pepito47@hotmail.com'
    );

insert into
    efi.persona
values
    (
        '109284567',
        'juan',
        'montes',
        '1993-01-20',
        'CR 10 N 247 pamplona',
        'neimarfu@gmail.com'
    );

insert into
    efi.persona
values
    (
        '88504189',
        'pedro',
        'montañes',
        '1983-07-29',
        'CR 11 N 247 pamplona',
        'monikita@yahoo.com'
    );

insert into
    efi.persona
values
    (
        '123',
        'luis',
        'olaya',
        '1983-07-29',
        'CR 11 N 247 pamplona',
        'luis@hotmail.com'
    );

create table efi.usuario(
    usu_login varchar(20) not null unique,
    usu_clave varchar(20) not null,
    per_id varchar(20) not null,
    primary key (per_id),
    foreign key (per_id) references efi.persona(per_id) on update cascade on delete restrict
);

insert into
    efi.usuario
values
    ('carlos', '123', '109245683');

insert into
    efi.usuario
values
    ('daniel', '124', '13345687');

insert into
    efi.usuario
values
    ('pepito', '125', '10947852');

insert into
    efi.usuario
values
    ('neimar', '126', '10924567');

insert into
    efi.usuario
values
    ('juan', '127', '109284567');

insert into
    efi.usuario
values
    ('pedro', '128', '88504189');

insert into
    efi.usuario
values
    ('luis', '12345', '123');

create table efi.rol(
    rol_id varchar(30) not null,
    rol_nombre varchar(80) not null,
    rol_descripcion varchar(100) not null,
    primary key (rol_id)
);

insert into
    efi.rol
values
    (
        '001',
        'Estudiante',
        'Persona que solo puede ver sus notas, programas, cancelacion, etc...'
    );

insert into
    efi.rol
values
    (
        '002',
        'Docente',
        'Persona encargada de registrar notas, materias asignadas, grupos, etc...'
    );

insert into
    efi.rol
values
    (
        '003',
        'Administradior',
        'Persona encargada de crear cuentas, asignar roles, etc....'
    );

insert into
    efi.rol
values
    (
        '004',
        'Director Programa',
        'Persona encargada de administrar el programa al que tiene asignado'
    );

create table efi.usuarioxrol(
    rol_id varchar (30) not null,
    usu_login varchar(20) Not null,
    primary key (rol_id, usu_login),
    foreign key (rol_id) references efi.rol(rol_id) on update cascade on delete restrict,
    foreign key (usu_login) references efi.usuario(usu_login) on update cascade on delete restrict
);

insert into
    efi.usuarioxrol
values
    ('001', 'carlos');

insert into
    efi.usuarioxrol
values
    ('002', 'daniel');

insert into
    efi.usuarioxrol
values
    ('003', 'pepito');

insert into
    efi.usuarioxrol
values
    ('004', 'neimar');

insert into
    efi.usuarioxrol
values
    ('002', 'juan');

insert into
    efi.usuarioxrol
values
    ('001', 'pedro');

insert into
    efi.usuarioxrol
values
    ('003', 'neimar');

insert into
    efi.usuarioxrol
values
    ('001', 'luis');

insert into
    efi.usuarioxrol
values
    ('002', 'luis');

insert into
    efi.usuarioxrol
values
    ('003', 'luis');

create table efi.modulo(
    mod_id varchar (30) not null,
    mod_nombre varchar(50) not null,
    mod_descripcion varchar(150) not null,
    primary key (mod_id)
);

insert into
    efi.modulo
values
    ('1', 'inscripcion', '1111');

insert into
    efi.modulo
values
    ('2', 'matricula', '2222');

insert into
    efi.modulo
values
    ('3', 'grados', '3333');

insert into
    efi.modulo
values
    ('4', 'egresados', '4444');

insert into
    efi.modulo
values
    ('5', 'calificaciones', '5555');

create table efi.funcionalidad(
    fun_id varchar(50) not null,
    fun_nombre varchar(50) not null,
    fun_ruta varchar(80) not null,
    fun_descripcion varchar(150) not null,
    mod_id varchar (30) not null,
    primary key (fun_id),
    foreign key (mod_id) references efi.modulo(mod_id) on update cascade on delete restrict
);

insert into
    efi.funcionalidad
values
    (
        '001',
        'Registro de notas',
        'registro y control',
        '------',
        '1'
    );

insert into
    efi.funcionalidad
values
    (
        '002',
        'Cambio horario',
        'direcion de programa',
        '------',
        '3'
    );

insert into
    efi.funcionalidad
values
    (
        '003',
        'Cambio materias',
        'direcion de programa',
        '------',
        '3'
    );

insert into
    efi.funcionalidad
values
    ('004', 'Ver notas', 'estudiantee', '------', '1');

insert into
    efi.funcionalidad
values
    (
        '005',
        'Reingreso',
        'registro y control ',
        '------',
        '1'
    );

insert into
    efi.funcionalidad
values
    (
        '006',
        'Homologacion',
        'registro y control',
        '------',
        '1'
    );

create table efi.rolxfuncionalidad(
    rol_id varchar(30) not null,
    fun_id varchar(50) not null,
    primary key (fun_id, rol_id),
    foreign key (fun_id) references efi.funcionalidad(fun_id) on update cascade on delete restrict,
    foreign key (rol_id) references efi.rol(rol_id) on update cascade on delete restrict
);

insert into
    efi.rolxfuncionalidad
values
    ('001', '004');

insert into
    efi.rolxfuncionalidad
values
    ('004', '002');

insert into
    efi.rolxfuncionalidad
values
    ('002', '001');

insert into
    efi.rolxfuncionalidad
values
    ('004', '003');

insert into
    efi.rolxfuncionalidad
values
    ('003', '006');

insert into
    efi.rolxfuncionalidad
values
    ('003', '005');

insert into
    efi.rolxfuncionalidad
values
    ('003', '004');

insert into
    efi.rolxfuncionalidad
values
    ('003', '002');
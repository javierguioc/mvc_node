drop table rolxfuncionalidad;
drop table usuarioxrol;
drop table funcionalidad;
drop table rol;
drop table usuario;
drop table persona;
drop table modulo; 

--Crear Super usuario--

CREATE USER electiva PASSWORD '12345';
ALTER ROLE electiva WITH SUPERUSER;

--Tablas--

create table persona(
    per_id varchar(20) not null,
    per_nombre varchar(50) not null,
    per_apellido varchar(50) not null,
    per_fecha_nacimiento date not null,
    per_direccion varchar(100),
    per_correo varchar (30) not null,
    primary key (per_id)
);

insert into persona values ('109245683','carlos','fuentes','1980-01-20','CR 5 N 247 pamplona','carlos@hotmail.com');
insert into persona values ('13345687','daniel','romero','1993-05-20','CR 6 N 247 pamplona','daniel4@hotmail.com');
insert into persona values ('10924567','neimar','fuentes','2000-11-10','CR 7 N 247 pamplona','neimarfu@gmail.com');
insert into persona values ('8850483','monica','latorre','1990-05-18','CR 8 N 247 pamplona','monikita@yahoo.com');
insert into persona values ('10947852','pepito','perez','1998-06-02','CR 9 N 247 pamplona','pepito47@hotmail.com');
insert into persona values ('109284567','juan','montes','1993-01-20','CR 10 N 247 pamplona','neimarfu@gmail.com');
insert into persona values ('88504189','pedro','montañes','1983-07-29','CR 11 N 247 pamplona','monikita@yahoo.com');
insert into persona values ('123','luis','olaya','1983-07-29','CR 11 N 247 pamplona','luis@hotmail.com');




create table usuario(
    usu_login varchar(20)not null unique,
    usu_clave varchar(20)not null,
    per_id varchar(20) not null,
    primary key (per_id), 
    foreign key (per_id) references persona(per_id) 
    on update cascade on delete restrict
);

insert into usuario values ('carlos','123','109245683');
insert into usuario values ('daniel','124','13345687');
insert into usuario values ('pepito','125','10947852');
insert into usuario values ('neimar','126','10924567');
insert into usuario values ('juan','127','109284567');
insert into usuario values ('pedro','128','88504189');
insert into usuario values ('luis','12345','123');


create table rol(
    rol_id SERIAL not null,
    rol_nombre varchar(80) not null,
    rol_descripcion varchar(100) not null,
    primary key (rol_id)
);

insert into rol(rol_nombre,rol_descripcion) values ('Estudiante','Persona que solo puede ver sus notas programas cancelacion etc...');
insert into rol(rol_nombre,rol_descripcion) values ('Docente','Persona encargada de registrar notas materias asignadas grupos etc...');
insert into rol(rol_nombre,rol_descripcion) values ('Administradior','Persona encargada de crear cuentas asignar roles etc....');
insert into rol(rol_nombre,rol_descripcion) values ('Director Programa','Persona encargada de administrar el programa al que tiene asignado');


create table usuarioxrol(
    rol_id integer not null,
    usu_login varchar(20) Not null,
    primary key (rol_id,usu_login),
    foreign key (rol_id) references rol(rol_id) 
    on update cascade on delete restrict,
    foreign key (usu_login) references usuario(usu_login) 
    on update cascade on delete restrict
);

insert into usuarioxrol values ('1','carlos');
insert into usuarioxrol values ('2','daniel');
insert into usuarioxrol values ('3','pepito');
insert into usuarioxrol values ('4','neimar');
insert into usuarioxrol values ('2','juan');
insert into usuarioxrol values ('1','pedro');
insert into usuarioxrol values ('3','neimar');
insert into usuarioxrol values ('1','luis');
insert into usuarioxrol values ('2','luis');
insert into usuarioxrol values ('3','luis');




create table modulo(
    mod_id SERIAL not null,
    mod_nombre varchar(50) not null,
    mod_descripcion varchar(150) not null,
    primary key (mod_id)
);

	     
insert into modulo(mod_nombre,mod_descripcion) values ('inscripcion','1111');
insert into modulo(mod_nombre,mod_descripcion) values ('matricula','2222');
insert into modulo(mod_nombre,mod_descripcion) values ('grados','3333');
insert into modulo(mod_nombre,mod_descripcion) values ('egresados','4444');
insert into modulo(mod_nombre,mod_descripcion) values ('calificaciones','5555');


create table funcionalidad(
    fun_id SERIAL not null,
    fun_nombre varchar(50) not null,
    fun_ruta varchar(80) not null,
    fun_descripcion varchar(150) not null,
    mod_id integer not null,
    primary key (fun_id),
    foreign key (mod_id) references modulo(mod_id)
    on update cascade on delete restrict
);

insert into funcionalidad(fun_nombre,fun_ruta,fun_descripcion,mod_id) values ('Registro de notas','registro y control','------',1);
insert into funcionalidad(fun_nombre,fun_ruta,fun_descripcion,mod_id) values ('Cambio horario','direcion de programa','------',3);
insert into funcionalidad(fun_nombre,fun_ruta,fun_descripcion,mod_id) values ('Cambio materias','direcion de programa','------',3);
insert into funcionalidad(fun_nombre,fun_ruta,fun_descripcion,mod_id) values ('Ver notas','estudiantee','------',1);
insert into funcionalidad(fun_nombre,fun_ruta,fun_descripcion,mod_id) values ('Reingreso','registro y control ','------',1);
insert into funcionalidad(fun_nombre,fun_ruta,fun_descripcion,mod_id) values ('Homologacion','registro y control','------',1);

          

create table rolxfuncionalidad(
    rol_id integer not null,
    fun_id integer not null,
    primary key (fun_id,rol_id),
    foreign key (fun_id) references funcionalidad(fun_id) 
    on update cascade on delete restrict,
    foreign key (rol_id) references rol(rol_id) 
    on update cascade on delete restrict
);

        
insert into rolxfuncionalidad values (1,4);
insert into rolxfuncionalidad values (4,2);		
insert into rolxfuncionalidad values (2,1);
insert into rolxfuncionalidad values (4,3);
insert into rolxfuncionalidad values (3,6);
insert into rolxfuncionalidad values (3,5);
insert into rolxfuncionalidad values (3,4);
insert into rolxfuncionalidad values (3,2);




-- Comments Table
CREATE DATABASE Locus_DB;
USE Locus_DB;

CREATE TABLE comments (
	id integer auto_increment,
    author varchar(80) not null,
    message varchar(255) not null,
    
    primary key(id);
);
DROP TABLE comments;

INSERT INTO comments (author, message, date_publication) 
VALUES ('Author Test', 'Messagge of text for comments', '6 de Octubre, 2022');

SELECT * FROM comments;

-- Photos table

CREATE DATABASE Locus_DB;
USE Locus_DB;

CREATE TABLE photos (
	id integer auto_increment,
    nombre varchar(80) not null,
    descripcion varchar(255) not null,
    fecha varchar(80) not null,
    img_ruta varchar(255) not null,
    likes mediumint not null,
    
    primary key(id)
);
DROP TABLE photos;

INSERT INTO photos (nombre, descripcion, fecha, img_ruta, likes) 
VALUES ('Author Test', 'Messagge of text for comments', '10 de Octubre, 2022', 'https://res.cloudinary.com/dkxhqlmec/image/upload/v1665433720/cld-sample-5.jpg', '5');

SELECT * FROM photos;

-- Services tables
CREATE DATABASE Locus_DB;
USE Locus_DB;

CREATE TABLE services_publications (
    id integer auto_increment,
    categoria varchar(80) not null,
    titulo varchar(80) not null,
    subtitulo varchar(100) not null,
    descripcion varchar(255) not null,
    tipo_negocio varchar(100) not null,
    link_negocio varchar(255) not null,
    img_ruta varchar(255) not null,


    primary key(id)
);

DROP TABLE services_publications;

SELECT * FROM services_publications;

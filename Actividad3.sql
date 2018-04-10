use Actividad3;
create table usuarios (
	id integer auto_increment,
    usuario varchar(30),
    email varchar(50),
    password varchar(50),
    isAdmin tinyint default 0,
primary key (id)
);

INSERT INTO usuarios (usuario, email, password, isAdmin)
VALUES ('admin', 'admin@admin.com', '96e79218965eb72c92a549dd5a330112');

create table destinos (
	id integer auto_increment,
    viaje varchar(30),
    precio integer,
    descripcion varchar (200),
    fecha_sal varchar(15),
    fecha_vuel varchar(15),
    imagen varchar(50),
    activo tinyint,
    primary key (id)
);
INSERT INTO destinos (viaje, precio, descripcion, fecha_sal, fecha_vuel, imagen, activo)
VALUES ("Malta preciosa", 450, "Una de las mejores playas del Mediterraneo, Malta, en pensión completa con vuelos incluídos", "15-Abril", "25-Abril", "malta.jpg",1),
("Hamburgo cultural", 650, "Una ciudad con personalidad propia en media pensión con vuelos incluídos", "25-Abril", "30-Abril", "hamburg.jpg",1),
("Maldivas maravillosas", 940, "Paraiso sin igual de playas y naturaleza en estado puro, en pensión completa con vuelos incluídos", "19-Abril", "3-Mayo", "azores.jpg",1);
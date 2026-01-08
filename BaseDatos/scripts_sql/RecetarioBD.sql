CREATE DATABASE RecetarioBD;
USE RecetarioBD;

CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nombre_usuario VARCHAR(100) NOT NULL,
  correo VARCHAR(150) NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  tipo_alimentacion VARCHAR(100),
  Padecimientos VARCHAR(250),
  Alergias VARCHAR(250),
  PRIMARY KEY (id_usuario),
  UNIQUE (correo)
);

CREATE TABLE receta (
  id_receta INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(40) NOT NULL,
  Descripcion TEXT,
  Instrucciones TEXT,
  Categoria VARCHAR(255),
  Tiempo INT,
  Utensilios VARCHAR(255),
  PRIMARY KEY (id_receta)
);

CREATE TABLE ingrediente (
  id_ingrediente INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(255),
  PRIMARY KEY (id_ingrediente)
);

CREATE TABLE ingredientereceta (
  id_ingr_rec INT NOT NULL AUTO_INCREMENT,
  id_receta INT,
  id_ingrediente INT,
  Cantidad FLOAT,
  Unidad VARCHAR(255),
  PRIMARY KEY (id_ingr_rec),
  FOREIGN KEY (id_receta) REFERENCES receta(id_receta),
  FOREIGN KEY (id_ingrediente) REFERENCES ingrediente(id_ingrediente)
);

CREATE TABLE favorito (
  id_favorito INT NOT NULL AUTO_INCREMENT,
  id_usuario INT,
  id_receta INT,
  fecha_guardado DATETIME,
  PRIMARY KEY (id_favorito),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_receta) REFERENCES receta(id_receta)
);

INSERT INTO receta (titulo, Descripcion, Instrucciones, Categoria, Tiempo, Utensilios) VALUES
('Crema de aguacate', 'Pele los aguacates, macháquelos y mézclelos con la crema. Añada leche poco a poco. Rectifique sazón y refrigere.', 'Pele los aguacates, macháquelos y mézclelos con la crema. Añada leche poco a poco. Rectifique sazón y refrigere.', 'Sopa', 30, 'Cacerola, licuadora'),

('Espagueti con salsa', 'Espagueti con salsa de jitomate y hierbas.', 'Prepare la salsa con jitomate y hierbas. Cueza el espagueti y sirva con salsa y queso.', 'Pasta', 45, 'Olla, cacerola'),

('Crema de espinacas', 'Crema de espinacas con huevo.', 'Cocine espinacas con caldo, agregue crema y queso. Sirva con huevo pochado.', 'Sopa', 40, 'Cacerola'),

('Sopa de calabacitas', 'Sopa de calabacitas con cilantro.', 'Licúe calabacitas con cilantro. Sofría cebolla, agregue licuado y caldo.', 'Sopa', 20, 'Licuadora, cacerola'),

('Coditos con jamón', 'Coditos con jamón y queso.', 'Cueza coditos, sofría jamón con mantequilla, mezcle y hornee con queso.', 'Pasta', 35, 'Olla, horno');

INSERT INTO ingrediente (Nombre) VALUES
('Aguacate'),
('Crema'),
('Leche'),
('Espagueti'),
('Jitomate'),
('Cebolla'),
('Ajo'),
('Queso Chihuahua'),
('Espinaca'),
('Huevo'),
('Calabacita'),
('Cilantro'),
('Coditos'),
('Jamón'),
('Mantequilla');

INSERT INTO ingredientereceta (id_receta, id_ingrediente, Cantidad, Unidad) VALUES
(1, 1, 4, 'piezas'),
(1, 2, 1, 'taza'),
(1, 3, 4, 'tazas'),

(2, 4, 200, 'gramos'),
(2, 5, 6, 'piezas'),
(2, 6, 1, 'pieza'),
(2, 7, 1, 'diente'),
(2, 8, 250, 'gramos'),

(3, 9, 0.5, 'kg'),
(3, 10, 4, 'piezas'),
(3, 2, 4, 'cucharadas'),

(4, 11, 6, 'piezas'),
(4, 12, 12, 'ramas'),

(5, 13, 200, 'gramos'),
(5, 14, 250, 'gramos'),
(5, 15, 0.75, 'barra');

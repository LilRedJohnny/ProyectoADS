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
  id_receta INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(40),
  Descripcion TEXT,
  Instrucciones TEXT,
  Categoria VARCHAR(255),
  Tiempo INT,
  Utensilios VARCHAR(255),
  imagen_url VARCHAR(255)
);

CREATE TABLE ingrediente (
  id_ingrediente INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(255),
  PRIMARY KEY (id_ingrediente)
);

CREATE TABLE HistorialReceta (
  id_historial INT AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_receta INT NOT NULL,
  fecha_preparacion DATETIME DEFAULT CURRENT_TIMESTAMP
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_receta) REFERENCES receta(id_receta)
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

INSERT INTO receta (titulo, Descripcion, Instrucciones, Categoria, Tiempo, Utensilios, imagen_url) VALUES
(
  'Crema de aguacate',
  'Pele los aguacates, macháquelos y mézclelos con la crema.',
  'Pele los aguacates, macháquelos y mézclelos con la crema. Añada leche poco a poco. Rectifique sazón y refrigere.',
  'Entrada',
  30,
  'Cacerola, licuadora',
  'https://www.unileverfoodsolutions.es/dam/global-ufs/mcos/spain/acm/selling-story-calcmenu/crema-aguacate-con-mayonesa-header.jpg'
),
(
  'Espagueti con salsa',
  'Espagueti con salsa de jitomate y hierbas.',
  'Prepare la salsa con jitomate y hierbas. Cueza el espagueti y sirva con salsa y queso.',
  'Entrada',
  45,
  'Olla, cacerola',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh12QJKkVP0qmtXT4qaSklChDpqEmCgM0nN6dyt3nPyKJ3zEoosr2VTDOW5RxQgWkP7rUcZSUCXKYccvXUSL0Dwfahm-OR8e1Em8ULBH2nzzNsH9W7Fm8RHD31xb6mi4T6mx2Q5W3YcMExPHsQBVhY8QlxWvJ8rn0VAf79rHE14tjbVqnpyC3yJVnyvyQ/s16000-rw/espaguetis-tomate-vegetales.JPG'
),
(
  'Crema de espinacas',
  'Crema de espinacas con huevo.',
  'Cocine espinacas con caldo, agregue crema y queso. Sirva con huevo pochado.',
  'Entrada',
  40,
  'Cacerola',
  'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/8a093085-b447-44cd-8c6d-0215b099994c/Derivates/b1413912-f436-4d12-ab9b-b3b94c82588b.jpg'
),
(
  'Sopa de calabacitas',
  'Sopa de calabacitas con cilantro.',
  'Licúe calabacitas con cilantro. Sofría cebolla, agregue licuado y caldo.',
  'Entrada',
  20,
  'Licuadora, cacerola',
  'https://www.bancodealimentoschicago.org/wp-content/uploads/2022/04/Zucchini-and-Potato-Tomato-Soup.jpg'
),
(
  'Coditos con jamón',
  'Coditos con jamón y queso.',
  'Cueza coditos, sofría jamón con mantequilla, mezcle y hornee con queso.',
  'Entrdaa',
  35,
  'Olla, horno',
  'https://www.lamichoacanameatmarket.com/wp-content/uploads/2018/12/CODITOS26.jpg'
),
(
  'Tacos de requesón con salsa de cacahuate',
  'Tortillas rellenas de requesón bañadas con salsa cremosa de cacahuate.',
  'Cortar cebolla, ajo y tomates. Sofreír con chiles y cacahuates. Agregar caldo y crema, licuar y reservar. Mezclar requesón con tomate y cebolla. Calentar tortillas, rellenar y bañar con salsa. Decorar con crema, panela y brotes.',
  'Plato fuerte',
  45,
  'Cuchillos, tabla, ollas, sartenes, licuadora'
),
(
  'Tinga de setas',
  'Tinga vegetariana de setas en salsa de jitomate y chipotle.',
  'Sofreír cebolla en aceite, agregar setas y cocinar. Licuar jitomate, chipotle y ajo, colar y verter sobre las setas. Cocinar hasta espesar, rectificar sal y servir en tortillas con nata y queso.',
  'Plato fuerte',
  40,
  'Comal, sartén, licuadora, colador'
),
(
  'Flan de elote',
  'Flan cremoso de elote con caramelo.',
  'Preparar caramelo con azúcar y agua y verter en el molde. Licuar leche condensada, evaporada, huevos, queso crema, elote y vainilla. Verter en el molde, cubrir y hornear a baño María a 200°C por 50 minutos. Refrigerar antes de servir.',
  'Postre',
  180,
  'Sartén, licuadora, molde, horno'
);



INSERT INTO ingrediente (Nombre) VALUES
('Tomate'),
('Ajo'),
('Cebolla blanca'),
('Cebolla morada'),
('Tomate verde'),
('Cilantro'),
('Maíz'),
('Queso panela'),
('Aceite de girasol'),
('Chile de árbol seco'),
('Caldo de pollo'),
('Crema para cocinar'),
('Requesón'),
('Cacahuate tostado'),
('Crema ácida'),
('Setas'),
('Nata'),
('Queso fresco'),
('Aceite vegetal'),
('Jitomate pera'),
('Chile chipotle adobado'),
('Tortillas de maíz'),
('Azúcar'),
('Agua'),
('Leche condensada'),
('Queso crema'),
('Leche evaporada'),
('Huevo'),
('Granos de elote'),
('Extracto de vainilla');
INSERT INTO ingredientereceta (id_receta, id_ingrediente, Cantidad, Unidad) VALUES
-- Tacos de requesón con salsa de cacahuate
(6, 1, 6, 'piezas'),
(6, 2, 4, 'dientes'),
(6, 3, 2, 'piezas'),
(6, 4, 1, 'pieza'),
(6, 5, 8, 'piezas'),
(6, 6, 1, 'ramo'),
(6, 7, 2, 'kg'),
(6, 8, 200, 'gramos'),
(6, 9, 4, 'cucharadas'),
(6, 10, 5, 'piezas'),
(6, 11, 1, 'taza'),
(6, 12, 2, 'tazas'),
(6, 13, 2, 'tazas'),
(6, 14, 1, 'taza'),
(6, 15, 1, 'taza'),

-- Tinga de setas
(7, 16, 800, 'gramos'),
(7, 17, 300, 'gramos'),
(7, 18, 500, 'gramos'),
(7, 19, 50, 'ml'),
(7, 20, 5, 'piezas'),
(7, 21, 3, 'piezas'),
(7, 3, 2, 'piezas'),
(7, 2, 2, 'dientes'),
(7, 22, 20, 'piezas'),

-- Flan de elote
(8, 23, 1, 'taza'),
(8, 24, 2, 'cucharadas'),
(8, 25, 1, 'lata'),
(8, 26, 100, 'gramos'),
(8, 27, 360, 'ml'),
(8, 28, 5, 'piezas'),
(8, 29, 1, 'taza'),
(8, 30, 1, 'cucharada');

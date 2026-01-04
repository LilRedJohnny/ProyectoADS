
CREATE TABLE Usuarios (
    ID_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    alergias TEXT,
    preferencias TEXT,
    padecimientos TEXT,
    experiencias TEXT
);

CREATE TABLE Receta (
    ID_receta INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    instrucciones TEXT NOT NULL,
    categoria VARCHAR(50),
    tiempo INT,
    utensilios TEXT
);

CREATE TABLE Ingrediente (
    ID_ingrediente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IngredienteReceta (
    ID_ingr_rec INT AUTO_INCREMENT PRIMARY KEY,
    ID_receta INT NOT NULL,
    ID_ingrediente INT NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL,

    FOREIGN KEY (ID_receta) REFERENCES Receta(ID_receta)
        ON DELETE CASCADE,
    FOREIGN KEY (ID_ingrediente) REFERENCES Ingrediente(ID_ingrediente)
        ON DELETE CASCADE
);

CREATE TABLE Favorito (
    ID_favorito INT AUTO_INCREMENT PRIMARY KEY,
    ID_usuario INT NOT NULL,
    ID_receta INT NOT NULL,
    fecha_guardado DATE NOT NULL,

    FOREIGN KEY (ID_usuario) REFERENCES Usuarios(ID_usuario)
        ON DELETE CASCADE,
    FOREIGN KEY (ID_receta) REFERENCES Receta(ID_receta)
        ON DELETE CASCADE
);

CREATE TABLE ListaCompra (
    ID_lista INT AUTO_INCREMENT PRIMARY KEY,
    ID_usuario INT NOT NULL,
    nombre VARCHAR(100),
    fecha_creacion DATE NOT NULL,

    FOREIGN KEY (ID_usuario) REFERENCES Usuarios(ID_usuario)
        ON DELETE CASCADE
);

CREATE TABLE ItemCompra (
    ID_item INT AUTO_INCREMENT PRIMARY KEY,
    ID_lista INT NOT NULL,
    ID_ingrediente INT NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    comprado BOOLEAN DEFAULT FALSE,
    donde_se_compro VARCHAR(100),

    FOREIGN KEY (ID_lista) REFERENCES ListaCompra(ID_lista)
        ON DELETE CASCADE,
    FOREIGN KEY (ID_ingrediente) REFERENCES Ingrediente(ID_ingrediente)
        ON DELETE CASCADE
);

CREATE TABLE PlanSemanal (
    ID_plan INT AUTO_INCREMENT PRIMARY KEY,
    ID_usuario INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,

    FOREIGN KEY (ID_usuario) REFERENCES Usuarios(ID_usuario)
        ON DELETE CASCADE
);

CREATE TABLE PlanDia (
    ID_plan_dia INT AUTO_INCREMENT PRIMARY KEY,
    ID_plan INT NOT NULL,
    ID_receta INT NOT NULL,
    dia_semana VARCHAR(15) NOT NULL,
    comida VARCHAR(30) NOT NULL,

    FOREIGN KEY (ID_plan) REFERENCES PlanSemanal(ID_plan)
        ON DELETE CASCADE,
    FOREIGN KEY (ID_receta) REFERENCES Receta(ID_receta)
        ON DELETE CASCADE
);

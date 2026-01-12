// Archivo: rutas/auth.js
const express = require('express');
const router = express.Router();

// Importamos el modelo Usuario. 
// Usamos "../models" para salir de la carpeta rutas y entrar a models
const { Usuario } = require('../models'); 

const procesarChecklist = (datos) => {
        if (Array.isArray(datos) && datos.length > 0) {
            return datos.join(', '); 
        }
        return (typeof datos === 'string' && datos.trim() !== '') ? datos : "Ninguna";
};

// ==========================================
// RUTA DE LOGIN (POST /api/auth/login)
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body;
    
    // 1. Buscamos el usuario por correo
    const usuario = await Usuario.findOne({ where: { correo } });

    // 2. Validaciones
    if (!usuario) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    // Nota: Más adelante aquí deberías usar bcrypt.compare()
    if (password !== usuario.contraseña) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // 3. Respuesta exitosa
    res.json({
      status: 'yes',
      usuario
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: 'Error interno en el login' });
  }
});



// ==========================================
// RUTA DE REGISTRO (POST /api/auth/registro)
// ==========================================
router.post('/registro', async (req, res) => {
  try {
    // Asumimos que el frontend envía los datos dentro de un objeto "form"
    const { 
        nombre, 
        edad,
        correo, 
        password, 
        tipo,           // Array del checklist
        padecimientos,  // Array del checklist
        alergias        // Array del checklist
    } = req.body.form || req.body; // Un fallback por si no viene dentro de "form"
    console.log(req.body.form);
    console.log("Estas son las alergias teoricamente:" + alergias);
    console.log("Intento de registro:", nombre, correo);
    
    // 1. Validaciones básicas
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    
    if(edad <= 0 ){
      return res.status(400).json({ error: "Edad incorrecta" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
    }
    
    // 2. Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(409).json({ error: "Este correo ya está registrado" });
    }

    // 3. Función auxiliar para convertir Arrays a String (Checklists)
    

    // 4. Crear el usuario en la Base de Datos
    await Usuario.create({
      nombre_usuario: nombre,
      edad: edad,
      correo: correo,
      contraseña: password, // Recuerda: idealmente encriptar esto
      
      // Convertimos los arrays a texto
      tipo_alimentacion: procesarChecklist(tipo),
      Padecimientos: procesarChecklist(padecimientos),
      Alergias: procesarChecklist(alergias) // Respetando la 'S' mayúscula de tu modelo
    });
    
    res.json({ status: 'yes', message: "Usuario registrado con éxito" });

  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: 'Error interno del servidor al registrar' });
  }
});

router.put('/actualizar' ,async (req, res) => {
  console.log('actualizamos');
  console.log(req.body);
  const {correo, tipo , padecimientos , alergias} =req.body;
  console.log(padecimientos);
  console.log(correo);
  try{
    
    await Usuario.update({
      tipo_alimentacion: procesarChecklist(tipo),
      Padecimientos: procesarChecklist(padecimientos),
      Alergias: procesarChecklist(alergias) // Respetando la 'S' mayúscula de tu modelo
      },{
         where:{correo:correo}
      }
       
    );


    res.json({ status: 'yes', message: "Usuario registrado con éxito" });
  }catch(error){
    console.error("Error en registro:", error);
    res.status(500).json({ error: 'Error interno del servidor al registrar' });
    
  }
});
// Importante: Exportar el router para usarlo en aplicacion.js
module.exports = router;
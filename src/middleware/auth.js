import {pool} from '../db.js'
import {secretKey} from '../config.js'
import jwt from 'jsonwebtoken';




export const login = async (req, res) => {
  try {
    //Validar dartos para que no se caiga
  const {nombre,contraseña} = req.body
  const [rows] = await pool.query('SELECT nombre, contraseña FROM usuarios WHERE nombre = ? AND contraseña = ?',[nombre,contraseña])
  console.log(rows)
  console.log(rows[0].nombre)
    if (rows.length >= 1) {
      const token = jwt.sign({ userId: rows[0].nombre }, secretKey, { expiresIn: '1h' })
      res.status(200).json({ token })
     }
    }catch (error){
      return res.status(500).json({
          message: 'Credenciales inválidas'
      })
    } 
}
 


  export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return res.status(403).json({ error: 'Token inválido' });
      }
      req.userId = decoded.userId;
      next();
    });
  };


  // Ruta protegida que solo se puede acceder con un token válido
export const datosProtegidos = (req, res) => {
  return res.status(500).json({
    message: 'Tamo Ready'
  })
  };
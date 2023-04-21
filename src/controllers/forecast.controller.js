import {pool} from '../db.js'


export const getForecast = async (req,res) => {
    try {
        const[rows] = await pool.query('SELECT id_alerta, comentario FROM bt_comentarios')
        res.json(rows)
    }catch (error){
    return res.status(500).json({
        message: 'DB Error'
        })
    }    
}


export const getForecast_id = async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT id_alerta, comentario FROM bt_comentarios where id_alerta = ?',[req.params.id_alerta])
        console.log(rows)
        if (rows.length <= 0) return res.status(404).json({
            message: 'ID No encontrado'
        }) 
        res.json(rows[0])
    }catch (error){
        return res.status(500).json({
            message: 'DB Error'
        })
    }    
}


export const createForecast = async (req,res) => {
    try {
        // ** FALTAN HACER COMPROBACIONES EN LOS TIPO DE DATOS INGRESADOS**
        const {id,comentario} = req.body
        const [rows] = await pool.query('INSERT INTO bt_comentarios (id_alerta,comentario) VALUES (?,?)', [id,comentario])
        res.send({
            //id: rows.insertId, Por si tengo key auto incremental
            id,
            comentario,
            })
    }catch (error){
    return res.status(500).json({
        message: 'DB Error'
        })
    }    
}


export const deleteForecast = async (req,res) => {
    try {
        const [result] = await pool.query('delete from bt_comentarios where id_alerta = ?',[req.params.id_alerta])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'ID No encontrado'
        }) 
        res.sendStatus(204)
    }catch (error){
        return res.status(500).json({
            message: 'DB Error'
            })
    }    
}



export const updateForecast = async (req,res) => {
    try {
        const {id_alerta} = req.params
        const {comentario} = req.body
        const [result] = await pool.query('Update bt_comentarios SET comentario = IFNULL(?,comentario) where id_alerta = ?', [comentario,id_alerta])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'ID No encontrado'
        }) 
        const [rows] = await pool.query ('Select id_alerta, comentario from bt_comentarios where id_alerta = ?', [id_alerta])
        res.json(rows[0])
    }catch (error){
        return res.status(500).json({
            message: 'DB Error'
            })
    }    
}

// ** FALTAN HACER COMPROBACIONES EN LOS TIPO DE DATOS INGRESADOS**
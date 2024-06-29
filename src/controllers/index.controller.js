import {pool} from '../db.js';

export const ping = async (req, res) => {
    try {
        
        let [result] = await pool.query('SELECT "pong" AS result');
        res.json(result);
    } catch (error) {
        res.status(500).send({message: "hubo un error"})
    }

}
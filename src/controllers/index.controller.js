import {pool} from '../db.js';

export const ping = async (req, res) => {
    let [result] = await pool.query('SELECT "pong" AS result');
    res.json(result);

}
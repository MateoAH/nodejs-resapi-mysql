import { pool } from "../db.js";

export const getEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const [employee] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        if (employee.length <= 0) return res.status(404).json({ message: 'Employee not found' })
        res.json(employee)
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
}

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows)
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
}

export const createEmployee = async (req, res) => {
    const { name, salary } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary])
        // console.log(req.body)
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
}

export const deleteEmployee = async(req, res) => {
    const { id } = req.params
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Employee not found' })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body
    try {
    
        const [result] = await pool.query('UPDATE employee set name = ?, salary = ? where id = ?', [name, salary, id])
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' })
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        res.json(rows[0])    
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
}

export const updateFieldsEmployee = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body
    try {
        const [result] = await pool.query('UPDATE employee set name = IFNULL(?, name), salary = IFNULL(?, salary) where id = ?', [name, salary, id])

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' })
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
}
import { Router } from 'express'
import { getEmployees, createEmployee, updateEmployee, updateFieldsEmployee, deleteEmployee, getEmployee} from "../controllers/employees.controller.js";
const router = Router()

router.get('/employees/:id', getEmployee)

router.get('/employees', getEmployees);

router.post('/employees', createEmployee);

router.put('/employees/:id', updateEmployee);

router.patch('/employees/:id', updateFieldsEmployee);

router.delete('/employees/:id', deleteEmployee);

export default router
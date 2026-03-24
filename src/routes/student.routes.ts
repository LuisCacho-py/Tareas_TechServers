import { Router } from 'express';
import {
  listStudents,
  showCreate,
  saveStudent,
  showEdit,
  updateStudent,
  deleteStudent
} from '../controllers/student.controller';

const router = Router();

router.get('/alumnos', listStudents);
router.get('/alumnos/new', showCreate);
router.post('/alumnos', saveStudent);
router.get('/alumnos/edit/:id', showEdit);
router.put('/alumnos/:id', updateStudent);
router.delete('/alumnos/:id', deleteStudent);

export default router;
import { Request, Response } from 'express';
import Student from '../models/student.model';

const getNums = (current = 0) => {
  return Array.from({ length: 8 }, (_, i) => {
    const num = i + 1;
    return {
      val: num,
      sel: current === num
    };
  });
};

const checkData = (body: any) => {
  const errs: string[] = [];

  const nombre = String(body.nombre || '').trim();
  const correo = String(body.correo || '').trim();
  const expediente = String(body.expediente || '').trim();
  const semestre = Number(body.semestre);

  if (!nombre || !correo || !expediente || !body.semestre) {
    errs.push('Todos los campos son obligatorios');
  }

  const mailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correo && !mailRx.test(correo)) {
    errs.push('Correo no valido');
  }

  if (!Number.isInteger(semestre) || semestre < 1 || semestre > 8) {
    errs.push('El semestre debe estar entre 1 y 8');
  }

  return errs;
};

export const listStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .lean();

    res.render('students/index', {
      students,
      ok: req.query.ok,
      err: req.query.err
    });
  } catch (error) {
    res.render('students/index', {
      students: [],
      err: 'No se pudo cargar la lista'
    });
  }
};

export const showCreate = (req: Request, res: Response) => {
  res.render('students/create', {
    alumno: {},
    nums: getNums()
  });
};

export const saveStudent = async (req: Request, res: Response) => {
  const errs = checkData(req.body);

  if (errs.length > 0) {
    return res.render('students/create', {
      errs,
      alumno: req.body,
      nums: getNums(Number(req.body.semestre))
    });
  }

  try {
    await Student.create({
      nombre: req.body.nombre.trim(),
      correo: req.body.correo.trim(),
      expediente: req.body.expediente.trim(),
      semestre: Number(req.body.semestre),
      isDeleted: false
    });

    return res.redirect('/alumnos?ok=Alumno guardado');
  } catch (error) {
    return res.render('students/create', {
      errs: ['No se pudo guardar el alumno'],
      alumno: req.body,
      nums: getNums(Number(req.body.semestre))
    });
  }
};

export const showEdit = async (req: Request, res: Response) => {
  try {
    const alumno = await Student.findOne({
      _id: req.params.id,
      isDeleted: false
    }).lean();

    if (!alumno) {
      return res.redirect('/alumnos?err=Alumno no encontrado');
    }

    return res.render('students/edit', {
      alumno,
      nums: getNums(Number(alumno.semestre))
    });
  } catch (error) {
    return res.redirect('/alumnos?err=Alumno no encontrado');
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const errs = checkData(req.body);

  if (errs.length > 0) {
    return res.render('students/edit', {
      errs,
      alumno: {
        _id: req.params.id,
        nombre: req.body.nombre,
        correo: req.body.correo,
        expediente: req.body.expediente,
        semestre: Number(req.body.semestre)
      },
      nums: getNums(Number(req.body.semestre))
    });
  }

  try {
    const alumno = await Student.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false
      },
      {
        nombre: req.body.nombre.trim(),
        correo: req.body.correo.trim(),
        expediente: req.body.expediente.trim(),
        semestre: Number(req.body.semestre)
      },
      { new: true }
    );

    if (!alumno) {
      return res.redirect('/alumnos?err=Alumno no encontrado');
    }

    return res.redirect('/alumnos?ok=Alumno editado');
  } catch (error) {
    return res.redirect('/alumnos?err=No se pudo editar');
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const alumno = await Student.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    });

    if (!alumno) {
      return res.redirect('/alumnos?err=Alumno no encontrado');
    }

    return res.redirect('/alumnos?ok=Alumno eliminado');
  } catch (error) {
    return res.redirect('/alumnos?err=No se pudo eliminar');
  }
};
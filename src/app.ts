import express from 'express';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import path from 'path';
import studentRoutes from './routes/student.routes';

const app = express();

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main'
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(process.cwd(), 'src/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(process.cwd(), 'src/public')));

app.get('/', (req, res) => {
  res.redirect('/alumnos');
});

app.use(studentRoutes);

export default app;
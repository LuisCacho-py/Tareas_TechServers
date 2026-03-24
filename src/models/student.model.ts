import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    correo: {
      type: String,
      required: true,
      trim: true
    },
    expediente: {
      type: String,
      required: true,
      trim: true
    },
    semestre: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Student = model('Student', studentSchema);

export default Student;
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  academicId: string;
  password: string;
  role: string;
  faculty: string;
  department: string;
  academicLevel: string;
  courses: Types.ObjectId[];
  schedules: Types.ObjectId[];
  phone: string;
  status : string;
}

export const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    academicId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    academicLevel: {
      type: String,
      required: true,
    },
    courses: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
      default: [],
    },
    schedules : {
      type: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
      default: [],
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student'],
      default: 'student',
    },
    status : {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Student = mongoose.models.Student || mongoose.model('Student', UserSchema);
export default Student;
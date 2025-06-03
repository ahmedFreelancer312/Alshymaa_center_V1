import mongoose, { Schema, Types } from "mongoose";

export interface Icourse extends Document {
    courseCode: string;
    courseName: string;
    department: string;
    instructor: string;
    description: string;
    faculty: string;
    academicLevel: string;
    files : Types.ObjectId[]
    assignments : Types.ObjectId[]
}

export const courseSchema = new Schema<Icourse> ({
    courseCode: {
        type: String,
        required: true,
        unique: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    faculty : {
        type: String,
        required: true,
    },
    academicLevel : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    files : {
        type: [{ type: Schema.Types.ObjectId, ref: 'File' }],
        default: [],
    },
    assignments : {
        type: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
        default: [],
    }
}, {
    timestamps: true,
    versionKey: false,
})

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;
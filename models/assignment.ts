import mongoose, { Schema } from "mongoose"

export interface IAssignment extends Document {
    assignmentCode : string
    courseCode : string
    title : string
    description : string
    dueDate : Date
    fileUrl: string;
}

export const assignmentSchema = new Schema<IAssignment> ({
    assignmentCode: {
        type: String,
        required: true,
        unique: true,
    },
    courseCode: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate : {
        type: Date,
        required: true,
    },
        fileUrl: { 
        type: String,
        required: true,
    },
} , {
    timestamps: true,
    versionKey: false,
})

export const Assignment = mongoose.models.Assignment ||  mongoose.model("Assignment" , assignmentSchema)
export default Assignment
import mongoose, { Schema } from "mongoose";

export interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

export const AdminSchema = new Schema<IAdmin>({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin'],
        default: 'admin',
    },
}, {
    timestamps: true,
    versionKey: false,
})

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
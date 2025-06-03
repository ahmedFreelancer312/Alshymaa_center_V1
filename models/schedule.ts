import mongoose, { Schema } from "mongoose";

export interface ISchedule extends Document {
    meetingCode: string;
    meetingTitle: string;
    startTime: Date;
    endTime: Date;
    department: string;
    faculty: string;
    instructor: string;
    academicLevel: string;
    description: string;
}

export const scheduleSchema  = new Schema<ISchedule> ({
    meetingCode: {
        type: String,
        required: true,
        unique: true,
    },
    meetingTitle: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    academicLevel: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}, 
{
    timestamps: true,
    versionKey: false,
  }
)

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);
export default Schedule;
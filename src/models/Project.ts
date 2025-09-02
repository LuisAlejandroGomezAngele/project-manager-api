import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";
export interface IProject extends Document {
    proyectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask & Document>[];
}

const ProjectScrema: Schema = new Schema({
    proyectName: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: "Task",
        },
    ],
}, {
    timestamps: true,
})

const Project = mongoose.model<IProject>("Project", ProjectScrema);

export default Project;
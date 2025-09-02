import mongoose, { Schema, Document } from "mongoose";

export type ProjectType = Document & {
    proyectName: string;
    clientName: string;
    description: string;
}

const ProyectScrema: Schema = new Schema({
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
    }
})

const Proyect = mongoose.model<ProjectType>("Proyect", ProyectScrema);

export default Proyect;
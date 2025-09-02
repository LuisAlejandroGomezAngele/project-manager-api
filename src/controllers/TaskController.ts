import type { Request, Response } from 'express'
import { Types } from "mongoose"; // Asegúrate de importar Types si no está ya importado
import Project from '../models/Project';
import Task from '../models/Task';

export class TaskController {
    static createTask = async (req: Request, res: Response) => {

        try {
            const task = new Task(req.body)
            task.project = req.project.id as Types.ObjectId; 
            req.project.tasks.push(task._id as Types.ObjectId);
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada correctamente')
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor' })
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            res.json(tasks)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error del servidor' })
        }
    }
}
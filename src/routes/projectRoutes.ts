import { Router } from 'express';
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation';
import { validateProjectExists } from '../middleware/project';

import { ProjectController } from '../controllers/ProjectController';
import { TaskController } from '../controllers/TaskController';

const router = Router();

router.get('/', 
    ProjectController.getAllProjects
);
router.get('/:id',
    param('id').isMongoId().withMessage('El ID del proyecto no es válido'), 
    handleInputErrors,
    ProjectController.getProjectById
);

router.post('/', 
    body('proyectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    handleInputErrors,
    ProjectController.createProject,
);

router.put('/:id', 
    param('id').isMongoId().withMessage('El ID del proyecto no es válido'), 
    body('proyectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    handleInputErrors,
    ProjectController.updateProject,
);
router.delete('/:id',
    param('id').isMongoId().withMessage('El ID del proyecto no es válido'), 
    handleInputErrors,
    ProjectController.deleteProject
);

router.param('projectId', validateProjectExists);

router.post('/:projectId/tasks',
    param('projectId').isMongoId().withMessage('El ID del proyecto no es válido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    TaskController.createTask
);

router.get('/:projectId/tasks',
    param('projectId').isMongoId().withMessage('El ID del proyecto no es válido'),
    TaskController.getProjectTasks
);

router.get('/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage('El ID del proyecto no es válido'),
    param('taskId').isMongoId().withMessage('El ID de la tarea no es válido'),
    TaskController.getTaskById
);

router.put('/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage('El ID del proyecto no es válido'),
    param('taskId').isMongoId().withMessage('El ID de la tarea no es válido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
);

export default router;
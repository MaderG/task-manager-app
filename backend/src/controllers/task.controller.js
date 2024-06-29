import prismaClient from "../utils/prismaClient.js";
import { ZodError, z } from "zod";
import AppError from "../errors/AppError.js";

const taskSchema = z.object({
  title: z.string().min(3, "Task name must be at least 3 characters long."),
  description: z.string().optional(),
  completed: z.boolean(),
  createdAt: z.date().optional(),
  userId: z.string(),
});

const updateTaskSchema = z.object({
  title: z.string().min(3, "Task name must be at least 3 characters long.").optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

function paginate(query, { page = 1, take = 10 }) {
  const skip = (page - 1) * take;
  return {
    ...query,
    skip,
    take,
  };
}

export default class TaskController {
  async create(req, res) {
    try {
      const { title, description } = req.body;
      const task = taskSchema.parse({ title, description, completed: false, userId: req.user.id });
      const newTask = await prismaClient.task.create({ data: task });
      res.send(newTask);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send(err.errors);
      }
      return res.status(500).send({ message: err.message });
    }
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const take = 6;
      const query = paginate({
        where: { userId: req.user.id, completed: false },
        orderBy: { createdAt: 'desc' },
      }, { page, take });

      const [tasks, totalTasks] = await Promise.all([
        prismaClient.task.findMany(query),
        prismaClient.task.count({ where: { userId: req.user.id, completed: false } })
      ]);

      const totalPages = Math.ceil(totalTasks / take);

      const allTasks = await prismaClient.task.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
      })

      res.send({ tasks, totalPages, allTasks });
    } catch (err) {
      return res.status(500).send({ message: "Unable to get tasks" });
    }
  }

  async history(req, res) {
    try {
      const { page = 1 } = req.query;
      const take = 10;
      const query = paginate({
        where: { userId: req.user.id, completed: true },
        orderBy: { createdAt: 'desc' },
      }, { page, take });

      const [tasks, totalTasks] = await Promise.all([
        prismaClient.task.findMany(query),
        prismaClient.task.count({ where: { userId: req.user.id, completed: true } })
      ]);

      const totalPages = Math.ceil(totalTasks / take);

      res.send({ tasks, totalPages });
    } catch (err) {
      return res.status(500).send({ message: "Unable to get tasks" });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const task = await prismaClient.task.findUnique({
        where: { id, userId: req.user.id },
      });
      if (!task) {
        return res.status(404).send({ message: "Task not found" });
      }
      res.send(task);
    } catch (err) {
      return res.status(500).send({ message: "Unable to get task" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const taskData = updateTaskSchema.parse(req.body);
      const updatedTask = await prismaClient.task.update({
        where: { id },
        data: taskData,
      });
      res.send(updatedTask);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send(err.errors);
      }
      return res.status(500).send({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await prismaClient.task.delete({ where: { id } });
      res.send({ message: "Task deleted" });
    } catch (err) {
      return res.status(500).send({ message: "Unable to delete task" });
    }
  }
}

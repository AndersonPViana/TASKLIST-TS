import { Response } from "express";
import CustomRequest from "../interface/CustomInterface";

import { taskRepository } from "../repositories/taskRepository";
import { notFoundError } from "../helpers/apiError";

class TaskController {
  async create(req: CustomRequest, res: Response): Promise<Response> {
    const { id, name, check } = req.body;

    const user = req.user;

    if(!user) {
      throw new notFoundError("user not found")
    }

    const { name: name_user, email } = user;

    const task = taskRepository.create({ id, name, check, user });

    await taskRepository.save(task);

    return res.json({ 
      name_user,
      email,
      name,
      check      
    })

  }
}

export default new TaskController();
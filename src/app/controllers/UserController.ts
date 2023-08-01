import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

import { userRepository } from "../repositories/userRepository";
import { badRequestError, unauthorizedError } from "../helpers/apiError";
import CustomRequest from "../interface/CustomInterface";

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { id, name, email, password } = req.body;

    const userExist = await userRepository.findOneBy({ email });

    if(userExist) {
      throw new badRequestError("user already exists");
    }

    const password_hash = await bcrypt.hash(password, 8);

    const user = userRepository.create({ name, email, password_hash });

    await userRepository.save(user);

    return res.json({
      id, 
      name, 
      email
    });
  }

  async update(req: CustomRequest, res: Response): Promise<Response> {
    const { email, oldPassword, newPassword } = req.body;

    const user = req.user;

    if(email !== user.email) {
      const userExist = await userRepository.findOneBy({ email });

      if(userExist) {
        throw new badRequestError("user already exists");
      }
    }

    if(oldPassword && !(await bcrypt.compare(oldPassword, user.password_hash))) {
      throw new unauthorizedError("incorrect password");
    }

    const password_hash = await bcrypt.hash(newPassword, 8);

    await userRepository.update(user.id, { password_hash });

    return res.json({ message: "updated password" });
  }
}

export default new UserController();
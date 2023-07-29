import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

import { userRepository } from "../repositories/userRepository";
import { badRequestError } from "../helpers/apiError";

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
}
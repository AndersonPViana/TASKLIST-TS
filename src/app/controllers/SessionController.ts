import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { userRepository } from "../repositories/userRepository";
import { notFoundError, unauthorizedError } from "../helpers/apiError";
import authConfig from "../../config/authConfig";

class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });

    if(!user) {
      throw new notFoundError("user not found");
    }

    if(!(await bcrypt.compare(password, user.password_hash))) {
      throw new unauthorizedError("incorrect password");
    }

    const { id, name } = user;

    return res.json({
      user: {
        id, 
        name,
        email
      }, 
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionController();
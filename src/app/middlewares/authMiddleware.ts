import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import CustomRequest from "../interface/CustomInterface";
import authConfig from "../../config/authConfig";
import { unauthorizedError } from "../helpers/apiError";
import { userRepository } from "../repositories/userRepository";

type JwtPayLoad = {
  id: number;
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if(!authorization) {
    throw new unauthorizedError("not authorized");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, authConfig.secret) as JwtPayLoad;

  const user = await userRepository.findOneBy({ id });

  req.user = user;

  next();
}
import { Request } from "express";

import { User } from "../../entity/User";

export default interface CustomRequest extends Request {
  user: Partial<User>;
}
import { Response, Request, NextFunction } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader)
    return res
      .status(401)
      .json({ message: "Não autorizado, nenhum token foi encontrado" });
  // Bearer token is like this sihdashdsauhduhudasd
  const token = authorizationHeader.replace(/Bearer /, "");

  jwtService.veryfyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined")
      return res
        .status(401)
        .json({ message: "Não autorizado: token inválido" });

    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user;
    next();
  });
}

export function ensureAuthViaQuery(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { token } = req.query;

  if (!token)
    return res
      .status(401)
      .json({ message: "Não autorizado: nenhum token encontrado" });

  if (typeof token !== "string")
    return res.status(400).json({
      message: "O parâmetro token deve ser do tipo string",
    });

  jwtService.veryfyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined")
      return res.status(401).json({
        message: "Não autorizado: token inválido",
      });
    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user
    next()
  });
}

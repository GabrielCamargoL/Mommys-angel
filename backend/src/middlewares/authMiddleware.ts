import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iad: number;
  exp: number;
}

export default function authMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, 'segredo');

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch (err) {
    console.log(err)
    return res.sendStatus(401);
  }
}
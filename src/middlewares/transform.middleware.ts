import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TransformMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Object.keys(req.body).forEach((key) => {
      if (key.endsWith('_id') && typeof req.body[key] === 'string') {
        req.body[key] = Number(req.body[key]);
      }
    });

    next();
  }
}

import 'express-async-errors';
import express from 'express';
import { Request, Response, NextFunction } from 'express'
import { router } from './routes/routes';

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: "Error",
      message: error.message,
    });
  }
);

app.listen(3333, () => {
  console.log('🚀🚀 Server Started!');
});

export { app };;
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SubmitFeedbackUseCase } from '../useCases/SubmitFeedbackUseCase';

interface IRequestBody {
  type: string;
  comment: string;
  screenshot: string;
}

export class FeedbacksController {
  public async submit(req: Request, res: Response): Promise<Response> {
    const { comment, type, screenshot } = req.body as IRequestBody;

    const submitFeedbackUseCase = container.resolve(SubmitFeedbackUseCase);

    await submitFeedbackUseCase.execute({ comment, type, screenshot });

    return res.status(201).send();
  }
}

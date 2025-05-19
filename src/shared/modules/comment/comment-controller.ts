import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import {AuthorizeMiddleware, BaseController} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { isValidObjectId, Types } from 'mongoose';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { CommentService } from './comment-service.interface.js';
import { CreateCommentDto } from './index.js';
import { ObjectIdValidatorMiddleware } from '../../libs/rest/middleware/object-id-validator.middleware.js';
import { SchemaValidatorMiddleware } from '../../libs/rest/middleware/schema-validator.middleware.js';
import { createCommentDtoSchema } from './dto-schemas/create-comment-dto.schemas.js';
import { Config } from '../../libs/config/config.interface.js';
import { RestSchema } from '../../libs/config/rest.schema.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.CommentService) private commentService: CommentService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    super(logger);

    this.addRoute({path: '/:id/comments', method: HttpMethod.Get, handler: this.index.bind(this), middlewares: [new ObjectIdValidatorMiddleware(this.commentService, 'id')]});
    this.addRoute({path: '/:id/comments', method: HttpMethod.Post, handler: this.create.bind(this), middlewares: [new SchemaValidatorMiddleware(createCommentDtoSchema), new ObjectIdValidatorMiddleware(this.commentService, 'id'), new AuthorizeMiddleware(this.config.get('JWT_SECRET'))]});
  }

  private async create(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const dto = plainToClass(CreateCommentDto, req.body);
    dto.authorId = userId;
    dto.authorId = new Types.ObjectId();
    const offer = await this.commentService.create(dto);
    this.created(res, offer);
  }

  private async index(req: Request, res: Response): Promise<void> {
    const { limit, skip } = req.query;

    const defaultLimit = 20;
    const limitValue = limit ? parseInt(limit as string, 10) : defaultLimit;

    if (isNaN(limitValue)) {
      this.sendBadRequest('limit', limit);
    }

    const defaultSkip = 0;
    const skipValue = skip ? parseInt(skip as string, 10) : defaultSkip;

    if (isNaN(skipValue)) {
      this.sendBadRequest('skip', skip);
    }

    const { offerId } = req.params;

    if (!isValidObjectId(offerId)) {
      this.sendBadRequest('offerId', offerId);
    }

    const result = this.commentService.findAllForOffer(new Types.ObjectId(offerId), limitValue, skipValue);
    this.ok(res, result);
  }

  private sendBadRequest<T>(paramName: string, value: T): void {
    const error = `Wrong value for ${paramName}: ${value}`;
    this.logger.warn(error);
    throw new HttpError(StatusCodes.BAD_REQUEST, error);
  }
}

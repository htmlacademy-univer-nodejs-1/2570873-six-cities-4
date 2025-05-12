import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CheckIdService } from '../../libs/rest/types/check-id-service.interface.js';

export interface CommentService extends CheckIdService{
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findAllForOffer(offerId: Types.ObjectId, limit: number, skip: number): Promise<DocumentType<CommentEntity>[]>;
}

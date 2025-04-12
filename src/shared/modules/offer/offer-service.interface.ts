import { DocumentType } from '@typegoose/typegoose';
import { UUID } from 'node:crypto';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { PutOfferDto } from './dto/put-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  change(dto: PutOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: UUID): Promise<void>;
  findById(id: UUID): Promise<DocumentType<OfferEntity> | null>;
  findAll(limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  findAllPremium(limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  findAllFavourite(userId: UUID, limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  addToFavourite(orderId: UUID, userId: UUID): Promise<void>;
  removeFromFavourite(orderId: UUID, userId: UUID): Promise<void>;
}

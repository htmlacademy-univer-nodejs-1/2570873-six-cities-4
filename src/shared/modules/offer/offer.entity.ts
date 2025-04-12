import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';
import { UUID } from 'node:crypto';
import { City, ConvenienceType, HousingType } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base<UUID> {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name: string;

  @prop()
  public description: string;

  @prop({ required: true })
  public city: City;

  @prop({ required: true })
  public previewUrl: string;

  @prop({ required: false })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavourite: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({ required: true })
  public housingType: HousingType;

  @prop({ required: true })
  public rooms: number;

  @prop({ required: true })
  public guests: number;

  @prop({ required: true })
  public cost: number;

  @prop({ required: true })
  public conveniences: ConvenienceType[];

  @prop({ required: true, ref: UserEntity })
  public authorId: UUID;

  @prop({ required: true })
  public latitude: number;

  @prop({ required: true })
  public longitude: number;

  @prop({ required: true })
  public commentsNumber: number;

  @prop({ required: true })
  public favouriteUsers: UUID[] = [];
}

export const OfferModel = getModelForClass(OfferEntity);

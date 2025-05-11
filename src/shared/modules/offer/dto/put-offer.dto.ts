import { City, ConvenienceType, HousingType } from '../../../types/index.js';
import {Types} from 'mongoose';

export class PutOfferDto {
  public id: Types.ObjectId;
  public name: string;
  public description: string;
  public city: City;
  public previewUrl: string;
  public imagesUrls: string[];
  public isPremium: boolean;
  public housingType: HousingType;
  public roomsNumber: number;
  public guestsNumber: number;
  public cost: number;
  public conveniences: ConvenienceType[];
  public latitude: number;
  public longitude: number;
}


import { City, ConvenienceType, HousingType } from '../../../types/index.js';
import {Types} from 'mongoose';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public city: City;
  public previewUrl: string;
  public images: string[];
  public isPremium: boolean;
  public housingType: HousingType;
  public rooms: number;
  public guests: number;
  public cost: number;
  public conveniences: ConvenienceType[];
  public authorId: Types.ObjectId;
  public latitude: number;
  public longitude: number;
}

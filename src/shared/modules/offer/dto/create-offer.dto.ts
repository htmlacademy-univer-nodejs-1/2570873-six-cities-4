import { Ref } from '@typegoose/typegoose';
import { Amenity, City, HousingType } from '../../../types/index.js';
import { UserEntity } from '../../user/user.entity.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public publicationDate: Date;
  public city: City;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavourite: boolean;
  public rating: number;
  public housingType: HousingType;
  public rooms: number;
  public guests: number;
  public price: number;
  public amenities: Amenity[];
  public authorId: Ref<UserEntity>;
  public latitude: number;
  public longitude: number;
  public commentsNumber: number;
}

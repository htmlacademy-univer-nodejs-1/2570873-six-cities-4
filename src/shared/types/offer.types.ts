import { User } from './index.js';

export enum City {
  Paris = 'Paris',
  Cologne = 'Colonge',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export enum HousingType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export enum ConvenienceType {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

export type Offer = {
  name: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewUrl: string;
  images: string[];
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  housingType: HousingType;
  rooms: number;
  guests: number;
  cost: number;
  conveniences: ConvenienceType[];
  author: User;
  latitude: number;
  longitude: number;
  commentsNumber: number;
};

import { User } from './user.types.js';

export type City =
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf';

interface ICoordinates {
  latitude: number;
  longitude: number;
}

export type HousingType = 'apartment' | 'house' | 'room' | 'hotel';

export type Amenity =
  | 'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge';

export type Offer = {
  /** Наименование предложения (обязательное, мин. 10 символов, макс. 100 символов) */
  title: string;
  /** Описание предложения (обязательное, мин. 20 символов, макс. 1024 символа) */
  description: string;
  /** Дата публикации (обязательное, формат YYYY-MM-DD) */
  publicationDate: Date;
  /** Город (обязательное, один из заданных городов) */
  city: City;
  /** Превью изображения (обязательное, URL-адрес изображения) */
  previewImage: string;
  /**
   * Фотографии жилья (обязательное, массив ровно из 6 URL-адресов)
   * При импорте можно проверить, что массив содержит ровно 6 элементов.
   */
  images: [string, string, string, string, string, string];
  /** Флаг «Премиум» (обязательное, признак премиальности предложения) */
  isPremium: boolean;
  /** Флаг «Избранное» (обязательное, признак принадлежности к избранным предложениям) */
  isFavorite: boolean;
  /**
   * Рейтинг предложения (обязательное, число от 1 до 5 с одним знаком после запятой)
   */
  rating: number;
  /** Тип жилья (обязательное, один из вариантов: 'apartment', 'house', 'room', 'hotel') */
  housingType: HousingType;
  /** Количество комнат (обязательное, мин. 1, макс. 8) */
  rooms: number;
  /** Количество гостей (обязательное, мин. 1, макс. 10) */
  guests: number;
  /** Стоимость аренды (обязательное, число от 100 до 100000) */
  price: number;
  /** Удобства (обязательное, массив с одним или несколькими значениями из списка) */
  amenities: Amenity[];
  /** Автор предложения (обязательное, ссылка на сущность IUser) */
  user: User;
  /** Количество комментариев (рассчитывается автоматически) */
  commentsCount?: number;
  /** Координаты предложения (обязательное, объект с широтой и долготой) */
  coordinates: ICoordinates;
}

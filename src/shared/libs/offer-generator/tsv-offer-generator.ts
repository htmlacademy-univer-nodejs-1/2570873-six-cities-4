import dayjs from 'dayjs';
import { generateRandomBoolean, generateRandomValue, getRandomEnumValue, getRandomEnumValues, getRandomItem } from '../../helpers/index.js';
import { Amenity, City, HousingType } from '../../types/index.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferTsvParser } from './index.js';
import { OfferGenerator } from './offer-generator.interface.js';


const MIN_DAY_OFFSET = 0;
const MAX_DAY_OFFSET = 14;

const MIN_OFFER_ID = 0;
const MAX_OFFER_ID = 99999;

const MIN_RATING = 1.0;
const MAX_RATING = 5.0;

const MIN_ROOMS = 1;
const MAX_ROOMS = 6;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_COST = 1_000;
const MAX_COST = 500_000;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const offerId = generateRandomValue(MIN_OFFER_ID, MAX_OFFER_ID);
    const author = getRandomItem(this.mockData.authors);

    const offer = {
      title: getRandomItem(this.mockData.names),
      description: getRandomItem(this.mockData.descriptions),
      publicationDate: dayjs()
        .subtract(generateRandomValue(MIN_DAY_OFFSET, MAX_DAY_OFFSET))
        .toDate(),
      city: getRandomEnumValue(City),
      previewImage: `https://six-cities.ru/images/${offerId}/0`,
      images: [
        `https://six-cities.ru/images/${offerId}/1`,
        `https://six-cities.ru/images/${offerId}/2`,
        `https://six-cities.ru/images/${offerId}/3`,
        `https://six-cities.ru/images/${offerId}/4`,
        `https://six-cities.ru/images/${offerId}/5`,
        `https://six-cities.ru/images/${offerId}/6`
      ],
      isPremium: generateRandomBoolean(),
      isFavourite: generateRandomBoolean(),
      rating: generateRandomValue(MIN_RATING, MAX_RATING, 1),
      housingType: getRandomEnumValue(HousingType),
      rooms: generateRandomValue(MIN_ROOMS, MAX_ROOMS),
      guests: generateRandomValue(MIN_GUESTS, MAX_GUESTS),
      price: generateRandomValue(MIN_COST, MAX_COST, 2),
      amenities: getRandomEnumValues(Amenity),
      authorUrl: `https://six-cities/users/${author}`,
      latitude: generateRandomValue(0, 90, 6),
      longitude: generateRandomValue(0, 180, 6),
      commentsNumber: 0
    };
    const parser = new OfferTsvParser();

    return parser.toString(offer);
  }
}

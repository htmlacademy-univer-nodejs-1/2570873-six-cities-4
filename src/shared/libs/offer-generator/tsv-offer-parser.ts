import {
  Amenity,
  City,
  HousingType,
  Offer,
  UserType,
} from '../../types/index.js';

export class OfferTsvParser {
  constructor() {}

  parse(rawString: string): Offer {
    const trimString = rawString.trim();

    if (!trimString) {
      throw new Error('rawString should not be empty');
    }

    const splitString = trimString.split('\t');
    const [
      title,
      description,
      publicationDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavourite,
      rating,
      housingType,
      rooms,
      guests,
      price,
      amenities,
      author,
      authorEmail,
      latitude,
      longitude,
    ] = splitString;

    return {
      title,
      description,
      publicationDate: new Date(publicationDate),
      city: city as City,
      previewImage,
      images: images.split(';'),
      isPremium: Boolean(isPremium),
      isFavourite: Boolean(isFavourite),
      rating: Number(rating),
      housingType: housingType as HousingType,
      rooms: Number(rooms),
      guests: Number(guests),
      price: Number(price),
      amenities: amenities
        .split(';')
        .map((convenience) => convenience as Amenity),
      author: {
        email: authorEmail,
        name: author,
        userType: UserType.Basic,
        avatar: `http://localhost:1111/${author}`,
      },
      latitude: Number(latitude),
      longitude: Number(longitude),
      commentsNumber: 0,
    };
  }

  toString(offer: Offer): string {
    return [
      offer.title,
      offer.description,
      offer.publicationDate,
      offer.city,
      offer.previewImage,
      offer.images.join(';'),
      offer.isPremium,
      offer.isFavourite,
      offer.rating,
      offer.housingType,
      offer.rooms,
      offer.guests,
      offer.price,
      offer.amenities.join(';'),
      offer.author.name,
      offer.author.email,
      offer.latitude,
      offer.longitude,
    ].join('\t');
  }
}

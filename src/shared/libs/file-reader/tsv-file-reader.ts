import { readFileSync } from 'node:fs';
import { Amenity, City, HousingType, Offer, UserType } from '../../types/index.js';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        publicationDateStr,
        city,
        previewImage,
        imagesStr,
        isPremiumStr,
        isFavoriteStr,
        ratingStr,
        housingType,
        roomsStr,
        guestsStr,
        priceStr,
        amenitiesStr,
        userName,
        userEmail,
        userAvatar,
        userPassword,
        userType,
        commentsCountStr,
        coordinatesStr
      ]) => ({
        title,
        description,
        publicationDate: new Date(publicationDateStr),
        city: city as City,
        previewImage,
        images: imagesStr
          .split(',')
          .map((url) => url.trim()) as [string, string, string, string, string, string],
        isPremium: isPremiumStr.toLowerCase() === 'true',
        isFavorite: isFavoriteStr.toLowerCase() === 'true',
        rating: parseFloat(ratingStr),
        housingType: housingType as HousingType,
        rooms: Number(roomsStr),
        guests: Number(guestsStr),
        price: Number(priceStr),
        amenities: amenitiesStr.split(',').map((item) => item.trim()) as Amenity[],
        user: {
          name: userName,
          email: userEmail,
          avatar: userAvatar,
          password: userPassword,
          userType: userType as UserType,
        },
        commentsCount: Number(commentsCountStr),
        coordinates: (() => {
          const [latStr, lonStr] = coordinatesStr.split(',').map((coord) => coord.trim());
          return {
            latitude: Number(latStr),
            longitude: Number(lonStr)
          };
        })()
      }));

  }
}

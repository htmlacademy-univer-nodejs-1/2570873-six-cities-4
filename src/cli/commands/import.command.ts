import { getErrorMessage } from '../../shared/helpers/common.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import { TsvFileReader } from '../../shared/libs/file-reader/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { OfferTsvParser } from '../../shared/libs/offer-generator/index.js';
import {
  DefaultOfferService,
  OfferModel,
  OfferService,
} from '../../shared/modules/offer/index.js';
import {
  DefaultUserService,
  UserModel,
  UserService,
} from '../../shared/modules/user/index.js';
import { Offer } from '../../shared/types/index.js';
import { ICommand } from './command.interface.js';

export class ImportCommand implements ICommand {
  private readonly parser: OfferTsvParser = new OfferTsvParser();
  private readonly userService: UserService;
  private readonly offerService: OfferService;
  private readonly databaseClient: DatabaseClient;
  private readonly logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(
    filename: string,
    databaseConnectionUri: string,
    salt: string
  ): Promise<void> {
    this.salt = salt;

    await this.databaseClient.connect(databaseConnectionUri);
    const reader = new TsvFileReader(filename.trim());

    reader.on('line', this.onImportedLine);
    reader.on('end', this.onCompleteImport);

    try {
      await reader.read();
    } catch (error: unknown) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${getErrorMessage(error)}`);
    }
  }

  private async onImportedLine(
    importedLine: string,
    resolve: () => void
  ): Promise<void> {
    const offer = this.parser.parse(importedLine);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(importedRowCount: number) {
    console.log(`Imported ${importedRowCount} rows`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.author,
        password: '123456',
      },
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      publicationDate: offer.publicationDate,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      isFavourite: offer.isFavourite,
      rating: offer.rating,
      housingType: offer.housingType,
      rooms: offer.rooms,
      guests: offer.guests,
      price: offer.price,
      amenities: offer.amenities,
      authorId: user.id,
      latitude: offer.latitude,
      longitude: offer.longitude,
      commentsNumber: offer.commentsNumber,
    });
  }
}

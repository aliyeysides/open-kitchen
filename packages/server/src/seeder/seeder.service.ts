import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { COLLECTION_SEED_DATA, SEED_MODEL_NAME } from './constants';

@Injectable()
export default class SeederService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject(SEED_MODEL_NAME) private readonly modelName: string,
    @Inject(COLLECTION_SEED_DATA) private readonly seedData: any[],
    private readonly config: ConfigService,
  ) {
    (async () => {
      try {
        await this.seed();
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        } else {
          throw new Error('Seeding Error: ' + e);
        }
      }
    })();
  }

  async seed() {
    try {
      const isDev = this.config.get('node_env') === 'development'; // DO NOT REMOVE OR YOU WILL DROP PROD DB

      const model = this.connection.model(this.modelName);
      const collectionName = model.collection.name;
      const collection = this.connection.collection(collectionName);
      if (isDev && collection)
        await this.connection.dropCollection(collectionName);
      const seededItems = await model.insertMany(this.seedData);

      console.log(
        `Successfully Seeded Collection ${collectionName.toUpperCase()}: ${seededItems}`,
      );
    } catch (e) {
      throw e;
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import {
  COLLECTION_SEED_DATA,
  SEED_DB_NAME,
  SEED_MODEL_NAME,
} from './constants';

@Injectable()
export default class SeederService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject(SEED_MODEL_NAME) private readonly modelName: string,
    @Inject(COLLECTION_SEED_DATA) private readonly seedData: any[],
    @Inject(SEED_DB_NAME) private readonly dbName: string,
  ) {
    try {
      (async () => {
        await this.seed(this.dbName);
      })();
    } catch (e) {
      throw e;
    }
  }

  async seed(dbName: string) {
    try {
      const models = this.connection.modelNames();

      if (!models.includes(this.modelName)) {
        throw new Error(
          `The Model name "${this.modelName}" does not exist. Possible values are: ${models}`,
        );
      }

      const model = this.connection.model(this.modelName);
      const collectionName = model.collection.name;

      console.log('dbName::::', dbName);
      console.log('client::::', this.connection.getClient());
      const client = this.connection.getClient().db(dbName);
      if (dbName !== client.databaseName)
        throw new Error(`Attempting to drop ${client.databaseName}, bailing..`);

      console.log('client.databaseName', client.databaseName);

      await client.dropCollection(collectionName);

      const seededItems = await model.insertMany(this.seedData);

      console.log(
        `Successfully Seeded Collection ${collectionName.toUpperCase()} in ${
          client.databaseName
        }: ${seededItems}`,
      );
    } catch (e) {
      throw e;
    }
  }
}

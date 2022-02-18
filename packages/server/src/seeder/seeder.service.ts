import { Injectable, Inject } from '@nestjs/common';
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
    const logPrefix = `SeederService::${dbName}::${this.modelName}`;

    try {
      const models = this.connection.modelNames();

      if (!models.includes(this.modelName)) {
        throw new Error(
          `${logPrefix} The Model name "${this.modelName}" does not exist. Possible values are: ${models}`,
        );
      }

      const model = this.connection.model(this.modelName);
      const collectionName = model.collection.name;

      const client = this.connection.getClient().db(dbName);
      if (dbName !== client.databaseName)
        throw new Error(
          `${logPrefix} Attempting to drop ${client.databaseName} instead of ${dbName}, exiting seeder..`,
        );

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

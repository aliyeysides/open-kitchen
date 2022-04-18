import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export default class SeederService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async seed(dbName: string, modelName: string, seedData: any[]) {
    const logPrefix = `SeederService::${dbName}::${modelName}`;

    try {
      const models = this.connection.modelNames();

      if (!models.includes(modelName)) {
        throw new Error(
          `${logPrefix} The Model name "${modelName}" does not exist. Possible values are: ${models}`,
        );
      }

      const model = this.connection.model(modelName);
      const collectionName = model.collection.name;

      const client = this.connection.getClient().db(dbName);
      if (dbName !== client.databaseName)
        throw new Error(
          `${logPrefix} Attempting to drop ${client.databaseName} instead of ${dbName}, exiting seeder..`,
        );

      await client.dropCollection(collectionName);

      const seededItems = await model.insertMany(seedData);

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

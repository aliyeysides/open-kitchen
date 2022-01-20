import { Module } from '@nestjs/common';
import { GrocersService } from './grocers.service';
import { GrocersResolver } from './grocers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Grocer, GrocerSchema } from './entities/grocer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grocer.name, schema: GrocerSchema }]),
  ],
  providers: [GrocersResolver, GrocersService],
})
export class GrocersModule {}

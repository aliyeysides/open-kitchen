import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): number {
    return 200;
  }
}

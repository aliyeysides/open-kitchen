import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getVersion(): string {
    return process.env.npm_package_version;
  }

  createCheckoutSession(): string {
    return 'hello world';
  }
}

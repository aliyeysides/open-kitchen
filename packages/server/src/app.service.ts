import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): number {
    return 200;
  }

  getVersion(): string {
    console.log('APP VERSION:::::::', process.env.npm_package_version);
    return process.env.npm_package_version;
  }
}

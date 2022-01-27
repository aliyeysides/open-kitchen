import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/healthcheck')
  healthCheck(): number {
    return this.appService.healthCheck();
  }

  @Get('/version')
  getVersion(): string {
    return this.appService.getVersion();
  }
}

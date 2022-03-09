import { Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/healthcheck')
  @HttpCode(200)
  healthCheck() {}

  @Get('/version')
  getVersion(): string {
    return this.appService.getVersion();
  }

  @Post('/create-checkout-session')
  async checkout(@Req() req, @Res() res) {
    return await this.appService.createCheckoutSession(req, res);
  }
}

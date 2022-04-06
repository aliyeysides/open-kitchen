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

  @Get('/get-prices')
  async getPrices(@Req() req, @Res() res) {
    return await this.appService.getPrices(req, res);
  }

  @Post('/create-payment-intent')
  async checkoutIntent(@Req() req, @Res() res) {
    return await this.appService.createPaymentIntent(req, res);
  }

  @Post('/create-checkout-session')
  async checkoutSession(@Req() req, @Res() res) {
    return await this.appService.createCheckoutSession(req, res);
  }
}

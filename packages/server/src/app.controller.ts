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

  @Get('/get-recipe-ingredients')
  async getRecipeIngredients(@Req() req, @Res() res) {
    return await this.appService.getRecipeIngredients(req, res);
  }

  @Get('/get-checkout-session')
  async getCheckoutSession(@Req() req, @Res() res) {
    return await this.appService.getCheckoutSession(req, res);
  }

  @Post('/create-checkout-session')
  async checkoutSession(@Req() req, @Res() res) {
    return await this.appService.createCheckoutSession(req, res);
  }

  // @Post('/send-email')
  // async sendEmail(@Req() req, @Res() res) {
  //   return await this.appService.sendEmail(req, res);
  // }
}

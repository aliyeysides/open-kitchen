import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GqlGuard } from './auth/gql.guard';
import { Permissions } from './auth/permissions.decorator';
import { PermissionsGuard } from './auth/permissions.guard';

@UseGuards(GqlGuard, PermissionsGuard)
@Permissions('beta-user')
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
}

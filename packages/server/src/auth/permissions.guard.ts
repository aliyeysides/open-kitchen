// src/permissions.guard.ts

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      'permissions',
      context.getClass(),
    );
    console.log('ROUTEEEEEEE PERMISSION:::::::', routePermissions);
    if (!routePermissions) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    console.log('ctx.getContext().req::::::', ctx.getContext().req);
    const userPermissions = ctx.getContext().user.permissions;
    console.log('USER PERMISSION:::::', userPermissions);
    const hasPermission = () =>
      routePermissions.every((routePermission) =>
        userPermissions.includes(routePermission),
      );

    if (hasPermission()) {
      return true;
    }
    throw new ForbiddenException('Not enough permissions');
  }
}

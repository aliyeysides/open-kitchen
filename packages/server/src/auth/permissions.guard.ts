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
        context.getHandler(),
      );
      if (!routePermissions) {
        return true;
      }
      const ctx = GqlExecutionContext.create(context);
  
      const userPermissions = ctx.getContext()?.req.user.permissions; //[2].user.permissions
  
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
  
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log(`RolesGuard->`, context.getHandler());
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(`RolesGuard->roles`, roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user);
  }
}
function matchRoles(roles: string[], useRole: string[]): boolean {
  //写法一
  //   let match = false;
  //   for (const role of roles) {
  //     if (useRole.includes(role)) {
  //       match = true;
  //       break;
  //     }
  //   }
  //   return match;

  //写法二
  return roles.some((role) => useRole.includes(role));
}

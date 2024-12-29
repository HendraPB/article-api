import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const user = request.user;

  return data ? user?.[data] : user;
});
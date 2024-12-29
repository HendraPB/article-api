import { z } from 'zod';

export const LoginAuthSchema = z.object({
  username: z.string(),
  password: z.string()
});

export type LoginAuth = z.infer<typeof LoginAuthSchema>;

export class LoginAuthDto {
  static schema = LoginAuthSchema;
}

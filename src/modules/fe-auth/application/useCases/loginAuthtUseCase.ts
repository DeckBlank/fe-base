import { IAuthService } from '@fe-auth/domain/service';
import { IAuthServiceLoginParams } from '@fe-auth/domain/interfaces';

export class LoginAuthUseCase {
  constructor(private authService: IAuthService) {}

  async execute(data: IAuthServiceLoginParams) {
    return this.authService.login(data);
  }
}

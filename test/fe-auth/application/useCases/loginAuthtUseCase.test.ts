import { LoginAuthUseCase } from '@/modules/fe-auth/application/useCases';
import { IAuthService } from '@fe-auth/domain/service';
import { IAuthServiceLoginParams } from '@fe-auth/domain/interfaces';

class MockAuthService implements IAuthService {
  login = jest.fn();
}

describe('LoginAuthUseCase', () => {
  let loginAuthUseCase: LoginAuthUseCase;
  let mockAuthService: MockAuthService;

  const mockLoginParams: IAuthServiceLoginParams = {
    userName: 'testUser',
    email: 'test@example.com',
  };

  const mockLoginResponse = {
    status: 'success',
    message: 'Login successful',
    data: { token: 'mockToken' },
  };

  beforeEach(() => {
    mockAuthService = new MockAuthService();
    loginAuthUseCase = new LoginAuthUseCase(mockAuthService);
  });

  it('debería llamar a authService con data correcta', async () => {
    (mockAuthService.login as jest.Mock).mockResolvedValue(mockLoginResponse);

    const result = await loginAuthUseCase.execute(mockLoginParams);

    expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginParams);
    expect(result).toEqual(mockLoginResponse);
  });

  it('debería fallar el login', async () => {
    const mockError = new Error('Login failed');
    (mockAuthService.login as jest.Mock).mockRejectedValue(mockError);

    await expect(loginAuthUseCase.execute(mockLoginParams)).rejects.toThrow('Login failed');
    expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginParams);
  });
});

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const userEmail = 'fulano@gmail.com';

    await fakeUsersRepository.create({
      email: userEmail,
      name: 'fulano',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: userEmail,
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'fulano@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const userEmail = 'fulano@gmail.com';

    const user = await fakeUsersRepository.create({
      email: userEmail,
      name: 'fulano',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: userEmail,
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

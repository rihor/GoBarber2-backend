interface IMailConfig {
  driver: 'ethereal' | 'mailgun';

  host: string;
  port: number;
  username: string;
  password: string;

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  host: process.env.MAIL_HOSTNAME,
  port: Number(process.env.MAIL_PORT),
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,

  defaults: {
    from: {
      email: 'rihor1000@gmail.com',
      name: 'Pedro Pinho',
    },
  },
} as IMailConfig;

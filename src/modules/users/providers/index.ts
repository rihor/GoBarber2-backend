import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCrypyHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCrypyHashProvider);

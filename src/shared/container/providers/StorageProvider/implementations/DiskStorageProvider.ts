import path from 'path';
import fileSystem from 'fs';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fileSystem.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      fileSystem.promises.stat(filePath);
    } catch {
      return;
    }

    await fileSystem.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;

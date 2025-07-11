import { getConfig } from '../../config';

let FileStorage;

if (getConfig().FILE_STORAGE_PROVIDER === 'gcp') {
  FileStorage = require('./googleCloudFileStorage').default;
}

if (getConfig().FILE_STORAGE_PROVIDER === 'aws') {
  FileStorage = require('./awsFileStorage').default;
}

if (getConfig().FILE_STORAGE_PROVIDER === 'localhost') { 
  FileStorage = require('./localhostFileStorage').default;
}

if (getConfig().FILE_STORAGE_PROVIDER === 'cloudinary') {
  FileStorage = require('./cloudinaryFileStorage').default;
}

export default FileStorage;

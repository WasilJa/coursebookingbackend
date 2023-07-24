import DataUriParser from 'datauri/parser.js';
import path from 'path';

export const getDataUri = (file) => {
  // if (!file || typeof file.originalName !== 'string') {
  //   throw new Error('Invalid file');
  // }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};

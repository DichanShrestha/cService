import { NextApiRequest } from 'next';

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

declare module 'next' {
  interface NextApiRequest {
    file?: File;
  }
}

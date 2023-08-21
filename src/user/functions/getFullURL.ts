import { Request } from 'express';

export const getFullURL = (req: Request): string => {
  const url = `${req.protocol}://${req.get('Host')}${req.originalUrl}`;

  return url;
};

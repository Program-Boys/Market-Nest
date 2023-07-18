import { Request } from 'express';

export const getFullURL = async (req: Request): Promise<string> => {
  const url = `${req.protocol}://${req.get('Host')}${req.originalUrl}`;

  return url;
};

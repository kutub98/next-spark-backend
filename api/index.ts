/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import app from '../src/server';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};

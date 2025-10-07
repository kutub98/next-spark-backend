/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import app from '../dist/app';
import serverless from 'serverless-http';

const handler = serverless(app);
export default handler;

export const config = {
  api: { bodyParser: false },
};

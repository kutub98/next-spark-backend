/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import app from '../dist/server'; // Adjusted path to compiled output
import serverless from 'serverless-http';

const handler = serverless(app);
export default handler;

export const config = {
  api: { bodyParser: false },
};

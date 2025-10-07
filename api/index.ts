import serverless from 'serverless-http';
import app from '../dist/app'; // after build, dist/app.js exists

const handler = serverless(app);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};

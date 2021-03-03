/* tslint-disable no-console */
import * as dotenv from "dotenv";
import { existsSync } from 'fs';
import * as path from "path";

let hasRun = false;

export default async () => {
  if (hasRun) {
    return;
  }
  hasRun = true;
  let dotEnvExists = false;
  ['.env', `.env.${process.env.NODE_ENV || 'development'}`].map(file => {
    const filePath = path.normalize(path.join(__dirname, file));
    dotEnvExists = dotEnvExists || existsSync(filePath);
    if (dotEnvExists) {
      dotenv.config({ path: filePath });
      console.log('Loading env from', filePath);
      console.log(process.env.NODE_ENV);
    }
  });
};

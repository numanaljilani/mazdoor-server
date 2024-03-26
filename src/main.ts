import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
  //   prefix: '/uploads', // Define the URL prefix for accessing static files
  // });
  dotenv.config();
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  await app.listen(3000);


}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath);
  switch (ext.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream'; // Default content type
  }
}
bootstrap();

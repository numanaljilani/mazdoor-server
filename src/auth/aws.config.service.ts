// config/aws.config.ts
import {  DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class AwsConfigService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_REGION'),
    credentials : {
        accessKeyId : this.configService.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey : this.configService.getOrThrow('AWS_SECRET_KEY'),
    }
  });

  constructor(private readonly configService: ConfigService) {
    // this.s3 = new AWS.S3({
    //     accessKeyId: this.configService.get(process.env.AWS_ACCESS_KEY),
    //     secretAccessKey: this.configService.get(process.env.AWS_SECRET_KEY),
    //     // region: this.configService.get(process.env.AWS_REGION)
    // });
  }

  // getS3Instance(): AWS.S3 {

  //     return this.s3;
  // }

  async uploadProfile(filename: string, file: Buffer , ext ?: string) {
   try {
    const upload = await new Upload({
      client: this.s3Client,
      params: {
        Bucket: 'mazdoor',
        Key: filename,
        Body: file,
        ContentType: ext=== '.png' ? 'image/png': 'image/jpeg'
      },
    });
    const result = await upload.done();
    console.log("Upload completed:", result);
    return result;
   } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
   }

  }
  async upload(filename: string, file: Buffer , ext ?: string) {

   return await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'mazdoor',
        Key: filename,
        Body: file,
        ContentType: ext=== '.png' ? 'image/png': 'image/jpeg'
      }),
    );
  }
  async deletePost(filename: string, ) {

    const command = new DeleteObjectCommand({
      Bucket: 'mazdoor',
      Key: filename,
    });

   return await this.s3Client.send(command);
   
  }
}

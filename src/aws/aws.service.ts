import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
    });
  }

  async updateAvatar(id: number, { fieldname, buffer, mimetype }: Express.Multer.File) {
    await this.s3
      .putObject({
        Bucket: process.env.S3_BUCKET,
        Key: `users/${id}/${fieldname}`,
        Body: buffer,
        ContentType: mimetype,
      })
      .promise();

    const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/users/${id}/${fieldname}`;

    return url;
  }

  async deleteAvatar(id: number) {
    await this.s3
      .deleteObject({ Bucket: process.env.S3_BUCKET, Key: `users/${id}/avatar` })
      .promise();
  }
}

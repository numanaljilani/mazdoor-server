import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImageType {
  @Field()
  _id: string;

  @Field()
  userId: string;

  @Field()
  imageUrl: string;
}

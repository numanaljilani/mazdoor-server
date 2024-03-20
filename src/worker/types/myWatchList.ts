import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class myWatchListType {
  @Field()
  _id: string;

  @Field()
  userId: string;

  @Field()
  workerIds: string;

  @Field()
  name: string;

  @Field()
  imageUrl : string

  @Field()
  location : string;
}

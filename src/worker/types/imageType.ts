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
@ObjectType()
export class DeleteImageType {
@Field({nullable : true , defaultValue : "Trying to delete"})
message : string;
@Field({nullable : true , defaultValue : false})
success : boolean;
}

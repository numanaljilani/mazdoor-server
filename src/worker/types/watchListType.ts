import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class WatchListType {
    @Field()
    _id : string

    @Field()
    added : boolean 

    @Field()
    message : string

}

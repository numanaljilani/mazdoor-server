import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class WorkerType {

    @Field()
    name : string 

    @Field()
    phone : string
   

    @Field()
    email : string

    @Field()
    address : string

    @Field(() => [String]) // Define occupation field as an array of strings
    occupation: string[];


}

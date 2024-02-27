import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {

    @Field()
    name : string 

    @Field()
    phone : string
   
    @Field()
    password : string

    @Field()
    email : string

    @Field()
    address : string

    @Field()
    acess_token : string

}

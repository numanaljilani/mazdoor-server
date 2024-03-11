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

    access_token : string
    @Field()
    profile : string

}
@ObjectType()
export class PhoneAndPasswordError {

    @Field()
    error : string 

    @Field()
    message : string
}

@ObjectType()
export class AuthResult {
  @Field(() => UserType, { nullable: true })
  user: UserType;

  @Field(() => PhoneAndPasswordError, { nullable: true })
  error: PhoneAndPasswordError;
}

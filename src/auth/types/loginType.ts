import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
  @Field()
  _id : string

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
 
    @Field()
    isVerified : boolean
    
    @Field()
    isAdminVerfied : boolean

    @Field()
    occupation : boolean

    @Field()
    cost : number;
  
    @Field()
    unit : string;
  
    @Field(() => [String])
    tags : string[];
  
    @Field()
    location : string;
  
    @Field()
    admin : boolean;
  
    @Field()
    availablity : string;
  
    @Field()
    votes : number;

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

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

    @Field( { nullable: true })
    isWorker : boolean

    @Field( { nullable: true })
    occupation : string

    @Field( { nullable: true })
    cost : number;
  
    @Field( { nullable: true })
    unit : string;
  
    @Field(() => [String], { nullable: true })
    tags : string[];
  
    @Field( { nullable: true })
    location : string;
  
    @Field()
    admin : boolean;
  
    @Field( { nullable: true })
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

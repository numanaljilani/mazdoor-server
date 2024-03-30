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

    @Field({ nullable: true , defaultValue : "-"})
    address : string

    @Field()
    access_token : string

    @Field({ nullable : true ,defaultValue : 'user.png'})
    profile : string
 
    @Field()
    isVerified : boolean
    
    @Field()
    isAdminVerfied : boolean

    @Field( { nullable: true , defaultValue : false})
    isWorker : boolean

    @Field( { nullable: true , defaultValue : "any work" })
    occupation : string

    @Field( { nullable: true , defaultValue : 0})
    cost : number;
  
    @Field( { nullable: true , defaultValue : "-"})
    unit : string;
  
    @Field(() => [String], { nullable: true })
    tags : string[];
  
    @Field( { nullable: true , defaultValue : '-' })
    location : string;
  
    @Field({defaultValue : false })
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

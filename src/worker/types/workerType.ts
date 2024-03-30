import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class WorkerType {
    @Field()
    _id : string

    @Field()
    name : string 

    @Field()
    phone : string

    @Field({ nullable : true ,defaultValue : 'user.png'})
    profile : string
   

    @Field()
    email : string

    @Field({ nullable : true ,defaultValue : 'any where'})
    address : string

    @Field({ nullable : true ,defaultValue : 'any service'}) // Define occupation field as an array of strings
    occupation: string;

    @Field({nullable : true , defaultValue : 0})
    cost : number;
  
    @Field({nullable : true , defaultValue : '-'})
    unit : string;
  
    // @Field()
    // tags : string[];
  
    @Field({ nullable : true ,defaultValue : 'any where'})
    location : string;
  
    @Field({ nullable : true ,defaultValue : false})
    admin : boolean;
  
    @Field({ nullable : true ,defaultValue : 'all deays'})
    availablity : string;
  
    @Field()
    votes : number;

    @Field({ nullable : true ,defaultValue : false})
    available : boolean;
  
    @Field()
    adminVerified : boolean;

    @Field({nullable : true , defaultValue : false })
    added : boolean 


}

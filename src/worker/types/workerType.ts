import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class WorkerType {
    @Field()
    _id : string

    @Field()
    name : string 

    @Field()
    phone : string
   

    @Field()
    email : string

    @Field()
    address : string

    @Field() // Define occupation field as an array of strings
    occupation: string;

    @Field()
    cost : number;
  
    @Field()
    unit : string;
  
    // @Field()
    // tags : string[];
  
    @Field()
    location : string;
  
    @Field()
    admin : boolean;
  
    @Field()
    availablity : string;
  
    @Field()
    votes : number;

    @Field()
    available : boolean;
  
    @Field()
    adminVerified : boolean;


}

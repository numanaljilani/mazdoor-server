import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";


@InputType('User')
export class CreateUserDto{

    @MinLength(1)
    @Field()
    name : string 
   
    @MinLength(6)
    @Field()
    password : string

    @MinLength(7)
    @Field({ nullable : true })
    @IsEmail()
    email : string

    @MinLength(8)
    @Field()
    address : string

    // @Field()
    // occupations : [string]

    // @Field()
    // current_location : string

    // @Field()
    // Likes : [string]

    // @Field()
    // comments : [string]

}




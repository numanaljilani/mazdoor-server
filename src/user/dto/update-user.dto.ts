import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";


@InputType('User')
export class UpdateUserDto{

    @MinLength(4)
    @Field({nullable : true})
    name : string 
   
    @MinLength(4)
    @Field({nullable : true})
    password : string

    @MinLength(7)
    @Field({ nullable : true })
    @IsEmail()
    email : string

    @MinLength(8)
    @Field({nullable : true})
    address : string

}




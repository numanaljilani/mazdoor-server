import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


@InputType('login')
export class LoginDto {



    @Field()
    phone : number


    @Field()
    password : string

}
import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";


@InputType('login')
export class LoginDto {


    @Field()
    phone : number

    @Field()
    password : string

}
import { Field, InputType } from "@nestjs/graphql";


@InputType('login')
export class LoginDto {

    @Field()
    phone : number


    @Field()
    password : string

}
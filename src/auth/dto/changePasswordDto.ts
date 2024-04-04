import { Field, InputType } from "@nestjs/graphql";


@InputType('changePasswordDto')
export class ChangePasswordDto {

    @Field()
    password : string

}
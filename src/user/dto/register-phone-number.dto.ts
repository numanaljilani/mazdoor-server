
import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsPhoneNumber, MinLength } from "class-validator";


@InputType('Phone')
export class RegisterPhoneNumberDto {
    @IsPhoneNumber()
    phone : number 
}




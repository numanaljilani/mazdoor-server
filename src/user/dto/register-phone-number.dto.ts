
import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from "class-validator";


@InputType('Phone')
export class RegisterPhoneNumberDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phone : number 
}




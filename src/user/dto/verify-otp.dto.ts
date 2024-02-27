
import { Field, InputType } from "@nestjs/graphql";

@InputType('Otp')
export class verifyOtpDto {
    @Field()
    otp : number 
}




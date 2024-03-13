import { Field, InputType } from "@nestjs/graphql";


@InputType('me')
export class Me {

    @Field()
    token : string

}
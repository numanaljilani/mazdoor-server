import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  isVerified : boolean;

  @Column()
  isAdminVerfied : boolean;

  @Column({ nullable : true})
  profile : string;


  @Column()
  occupation : string;



}

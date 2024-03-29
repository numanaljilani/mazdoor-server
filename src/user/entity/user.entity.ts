import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @PrimaryColumn()
  id: string;

  // @Index({ fulltext: true })
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

  @Column({default : false})
  isWorker : boolean;

  @Column()
  isAdminVerfied : boolean;

  @Column()
  profile : string;

  @Column()
  occupation : string;

  @Column()
  cost : number;

  @Column()
  unit : string;

  @Column()
  tags : string[];

  @Column()
  location : string;

  @Column()
  admin : boolean;

  @Column()
  availablity : string;

  @Column({ default : 0 })
  votes : number;

  @Column()
  adminVerified : boolean;

  @Column()
  available : boolean;

}

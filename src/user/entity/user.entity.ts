import { Image } from 'src/worker/entity/images.entity';
import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryColumn } from 'typeorm';

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


  @OneToMany(() => Image, image => image.user)
  images: Image[];

}

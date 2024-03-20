import { ObjectId } from 'mongodb';
import { Column, Entity, Index, JoinColumn, ObjectIdColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class WatchList {
  @ObjectIdColumn()
  _id: ObjectId;


  @Column()
  userId: string;

  @Column()
  workerIds: string;

  @Column()
  name: string;

  @Column()
  imageUrl : string

  @Column()
  location : string;
}

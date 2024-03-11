import { Entity, ObjectIdColumn, ObjectId,Column } from 'typeorm';
// import { ObjectId } from 'mongodb';

@Entity('otp') // Specify the MongoDB collection name
export class Otp {
  @ObjectIdColumn()
  _id: ObjectId;


  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  otp: number;

  @Column({ type: 'timestamp' }) // Store expiration timestamp as a timestamp type
  expiresAt: Date;
}

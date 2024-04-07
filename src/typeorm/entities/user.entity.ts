import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
@Entity('USER_INFO')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  @Column({name : "USER_ID" , primary : true , generatedIdentity : 'BY DEFAULT'})
  _id: string;

  @Column({ type: 'varchar', name : "EMAIL", nullable: false, unique: true })
  _email: string;

  @Column({ type: 'varchar', name : "FULL_NAME", nullable: false})
  _fullName : string;

  @Column({ type: 'varchar' , name : "PASSWORD", nullable: false})
  _password: string;

  @Column({type : 'varchar' , name : "PHONE" , nullable : true})
  _phone: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get id(): string {
    return this._id;
  }
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }
}

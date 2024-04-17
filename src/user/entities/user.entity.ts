import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  lastClaim: Date;

  @Column({ nullable: true })
  twitchApproved: boolean;

  @Column({ nullable: true })
  twitchRefreshToken: string;

  @Column({ nullable: true })
  twitchAccessToken: string;

  @Column({ nullable: true })
  twitchUsername: string;
}

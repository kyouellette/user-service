import { UserEntity } from '../entities/user.entity';

export class UserResponseDTO {
  id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  createdAt?: Date;
  twitchRefreshToken?: string;
  twitchAccessToken?: string;
  twitchUsername?: string;

  constructor(userData: UserEntity) {
    this.id = userData?.id;
    this.twitchRefreshToken = userData?.twitchRefreshToken;
    this.twitchAccessToken = userData?.twitchAccessToken;
    this.twitchUsername = userData?.twitchUsername;
    this.userId = userData?.userId;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.username = userData.username;
    this.email = userData.email;
    this.createdAt = userData.createdAt;
  }
}

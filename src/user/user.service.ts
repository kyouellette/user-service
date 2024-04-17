import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Not, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { TwitchResponseDTO } from './dto/twitch-response.dto';
import { CreateTwitchDTO } from './dto/create-twitch.dto';
import { TwitchUsersResponseDTO } from './dto/twitch-users-response.dto';
import { RefreshTwitchDTO } from './dto/refresh-twitch.dto';
import { ClaimDTO } from './dto/claim.dto';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly walletService: WalletService,
  ) {}

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const { username, firstName, lastName, email, userId } = data;
    let userdata = {};
    try {
      userdata = await this.userRepository.save({
        username,
        firstName,
        lastName,
        email,
        userId,
        twitchApproved: false,
      });
    } catch (error) {
      throw new Error(error);
    }
    return userdata;
  }

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findOne({
      where: {
        userId: id,
      },
    });
    return new UserResponseDTO(user);
  }

  async getUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      return new UserResponseDTO(user);
    });
  }

  async saveTwitch(data: CreateTwitchDTO): Promise<TwitchResponseDTO> {
    const { userId, twitchAccessToken, twitchRefreshToken, twitchUsername } =
      data;
    await this.userRepository.update(
      {
        userId: userId,
      },
      {
        twitchAccessToken,
        twitchRefreshToken,
        twitchUsername,
      },
    );
    return new TwitchResponseDTO({
      twitchAccessToken,
      twitchRefreshToken,
      twitchUsername,
    });
  }

  async refreshTwitch(data: RefreshTwitchDTO): Promise<RefreshTwitchDTO> {
    const { oldTwitchAccessToken, newTwitchAccessToken } = data;
    await this.userRepository.update(
      {
        twitchAccessToken: oldTwitchAccessToken,
      },
      {
        twitchAccessToken: newTwitchAccessToken,
      },
    );
    return new RefreshTwitchDTO({ oldTwitchAccessToken, newTwitchAccessToken });
  }

  async claim(data: ClaimDTO): Promise<ClaimDTO> {
    const { userId, date } = data;
    await this.userRepository.update(
      {
        userId: userId,
      },
      {
        lastClaim: date,
      },
    );
    try {
      this.walletService.createTransaction(userId, '25', 'add').subscribe(
        () => console.log(`User claimed points: ${userId}`),
        (error) => console.error('Error creating transaction:', error),
      );
    } catch (error) {
      console.log('Error adding funds for user:', userId);
    }
    return new ClaimDTO({ userId, date });
  }

  async approve(data: { userId: string }): Promise<string> {
    const { userId } = data;
    await this.userRepository.update(
      {
        userId: userId,
      },
      {
        twitchApproved: true,
      },
    );
    return userId;
  }

  async getTwitchUsernames(): Promise<TwitchUsersResponseDTO[]> {
    const users = await this.userRepository.find({
      where: {
        twitchUsername: Not(IsNull()),
      },
    });
    return users.map((user) => {
      return {
        twitchAccessToken: user.twitchAccessToken,
        twitchRefreshToken: user.twitchRefreshToken,
        twitchUsername: user.twitchUsername,
      };
    });
  }
}

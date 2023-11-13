import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDTO } from './dto/user-response.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateTwitchDTO } from './dto/create-twitch.dto';
import { TwitchUsersResponseDTO } from './dto/twitch-users-response.dto';
import { RefreshTwitchDTO } from './dto/refresh-twitch.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(@Body() user: CreateUserDTO): Promise<UserResponseDTO> {
    return this.userService.createUser(user);
  }

  @Get('/get')
  getUsers(): Promise<UserResponseDTO[]> {
    return this.userService.getUsers();
  }

  @Get('/get/:id')
  getUserById(@Param('id') id: string): Promise<UserResponseDTO> {
    return this.userService.getUserById(id);
  }

  @Patch('/twitch/add')
  saveTwitch(@Body() twitchData: CreateTwitchDTO): Promise<UserResponseDTO> {
    return this.userService.saveTwitch(twitchData);
  }

  @Patch('/twitch/refresh')
  refreshTwitch(
    @Body() twitchData: RefreshTwitchDTO,
  ): Promise<RefreshTwitchDTO> {
    return this.userService.refreshTwitch(twitchData);
  }

  @Get('/twitch')
  getTwitchUsernames(): Promise<TwitchUsersResponseDTO[]> {
    return this.userService.getTwitchUsernames();
  }
}

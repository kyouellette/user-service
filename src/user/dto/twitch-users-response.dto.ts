export class TwitchUsersResponseDTO {
  twitchRefreshToken: string;

  twitchAccessToken: string;

  twitchUsername: string;

  constructor(data: TwitchUsersResponseDTO) {
    (this.twitchRefreshToken = data?.twitchRefreshToken),
      (this.twitchAccessToken = data?.twitchAccessToken),
      (this.twitchUsername = data?.twitchUsername);
  }
}

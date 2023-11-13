export class TwitchResponseDTO {
  twitchRefreshToken: string;

  twitchAccessToken: string;

  twitchUsername: string;

  constructor(data: TwitchResponseDTO) {
    (this.twitchRefreshToken = data?.twitchRefreshToken),
      (this.twitchAccessToken = data?.twitchAccessToken),
      (this.twitchUsername = data?.twitchUsername);
  }
}

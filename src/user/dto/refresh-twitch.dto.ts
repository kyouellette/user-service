export class RefreshTwitchDTO {
  oldTwitchAccessToken: string;

  newTwitchAccessToken: string;

  constructor(data: RefreshTwitchDTO) {
    (this.oldTwitchAccessToken = data?.oldTwitchAccessToken),
      (this.newTwitchAccessToken = data?.newTwitchAccessToken);
  }
}

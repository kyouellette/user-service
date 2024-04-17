export class ClaimDTO {
  date: Date;

  userId: string;

  constructor(data: ClaimDTO) {
    (this.date = data?.date), (this.userId = data?.userId);
  }
}

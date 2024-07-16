export enum PrizeRedemptionStatusTypeEnum {
  Pending = "PENDING",
  Declined = "DECLINED",
  Successful = "SUCCESSFUL",
}

export interface IPrize {
  _id: string;
  title: string;
  thumbnail: string;
  amount: number;
  count: number;
  createdAt: Date;
  isRedeemed: boolean;
  status: PrizeRedemptionStatusTypeEnum;
}

import type { IPrize, PrizeRedemptionStatusTypeEnum } from "./Prize";
import type { IUserPrivate } from "./User";

export type IPrizeRedemption = {
  _id: string;
  userId: IUserPrivate;
  prizeId: IPrize;
  status: PrizeRedemptionStatusTypeEnum;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
};

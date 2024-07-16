export enum UserRoleEnum {
  Admin = "admin",
  User = "user",
}

export interface AuthUser {
  _id: string;
  name: string;
  username: string;
  email: {
    address: string;
    verified: boolean;
  };
  role: UserRoleEnum;
  bio: string;
  profileImage: string;
  verified: boolean;
  followersCount: number;
  followingCount: number;
  reviewsCount: number;
  rank: string;
  remainingXp: number;
  progress: {
    level: number;
    xp: number;
  };
}

export type IAdminUser = {
  _id: string;
  name: string;
  profileImage: string;
  username: string;
  bio: string;
  verified?: boolean;
  createdAt: Date;
  isPrivate: boolean;
  email: {
    address: string;
    verified: boolean;
  };
  role: UserRoleEnum;
};

export type IUserPrivate = {
  _id: string;
  name: string;
  email: {
    address: string;
    verified: boolean;
  };
  profileImage: string;
  username: string;
  bio: string;
  role: UserRoleEnum;
  verified: boolean;
  createdAt: Date;
  isPrivate: boolean;
  progress: {
    level: number;
    xp: number;
  };
  accepted_eula: boolean;
};

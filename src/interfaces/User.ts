export interface AuthUser {
  _id: string;
  name: string;
  username: string;
  email: {
    address: string;
    verified: boolean;
  };
  role: "user" | "admin";
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

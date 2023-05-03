export type User = {
  id: number;
  username: string;
  is_admin: boolean;
};

export type UserRequest = {
  username: string;
  password: string;
  is_admin: boolean;
};

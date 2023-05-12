export type User = {
  id: number;
  username: string;
  is_admin: boolean;
};

// useCreateUser.ts
// useUpdateUser.ts
export type UserRequest = {
  username: string;
  password: string;
  is_admin: boolean;
};

// useGetUsers.ts
// useCreateUser.ts
// useUpdateUser.ts
export type UserResponse = {
  id: number;
  username: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};

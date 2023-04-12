import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';
import { type User } from 'types/api/user';

export type LoginUserContextType = {
  loginUser: User | null;
  setLoginUser: Dispatch<SetStateAction<User | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>(
  // eslint-disable-next-line
  {} as LoginUserContextType
);

export const LoginUserProvider = (props: {
  children: ReactNode;
}): JSX.Element => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<User | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

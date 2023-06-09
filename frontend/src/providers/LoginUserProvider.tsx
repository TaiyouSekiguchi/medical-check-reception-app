import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';
import { type User } from 'features/users/types/user';

type LoginUser = User;

export type LoginUserContextType = {
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>(
  // TODO eslint
  // eslint-disable-next-line
  {} as LoginUserContextType
);

type Props = {
  children: ReactNode;
};

export const LoginUserProvider = (props: Props): JSX.Element => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

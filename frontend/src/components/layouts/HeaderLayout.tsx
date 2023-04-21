import { memo, type ReactNode, type VFC } from 'react';
import { Header } from 'components/layouts/Header';

type Props = {
  children: ReactNode;
};

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
});

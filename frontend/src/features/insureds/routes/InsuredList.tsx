import { memo, useEffect, type VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { CenterSpinner } from 'components/spinner/CenterSpinner';
import { useGetInsureds } from '../api/useGetInsureds';
import { InsuredTable } from '../components/InsuredTable';

type Props = {
  isAdmin?: boolean;
};

export const InsuredList: VFC<Props> = memo((props) => {
  const { isAdmin = false } = props;
  const { getInsureds, loading, insureds } = useGetInsureds();
  const navigate = useNavigate();

  useEffect(() => {
    getInsureds();
  }, [getInsureds]);

  const onClickImport = () => {
    navigate('/home/insureds/import');
  };

  return (
    <ContentLayout title="被保険者一覧">
      {loading ? (
        <CenterSpinner />
      ) : (
        <Box p={4}>
          {isAdmin && insureds.length === 0 && (
            <PrimaryButton onClick={onClickImport}>インポート</PrimaryButton>
          )}
          <PrimaryButton onClick={onClickImport}>インポート</PrimaryButton>
          <BorderedBox>
            <InsuredTable insureds={insureds} />
          </BorderedBox>
        </Box>
      )}
    </ContentLayout>
  );
});

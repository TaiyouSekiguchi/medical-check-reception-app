import { memo, useEffect, type VFC } from 'react';
import {
  Box,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useAllInsureds } from './api/useAllInsureds';

type Props = {
  isAdmin?: boolean;
};

export const InsuredList: VFC<Props> = memo((props) => {
  const { isAdmin = false } = props;

  const { getInsureds, loading, insureds } = useAllInsureds();

  const navigate = useNavigate();

  useEffect(() => {
    getInsureds();
  }, [getInsureds]);

  const onClickDetail = () => {
    alert('詳細を表示します');
  };

  const onClickImport = () => {
    navigate('/home/insured_import');
  };

  return (
    <ContentLayout title="被保険者一覧">
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Box p={4}>
          {isAdmin && insureds.length === 0 && (
            <PrimaryButton onClick={onClickImport}>インポート</PrimaryButton>
          )}
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>被保険者番号</Th>
                <Th>姓</Th>
                <Th>名</Th>
                <Th>生年月日</Th>
                <Th>性別</Th>
                <Th>住所</Th>
              </Tr>
            </Thead>
            <Tbody>
              {insureds.map((insured) => (
                <Tr
                  key={insured.id}
                  _hover={{ bg: 'gray.300' }}
                  onClick={onClickDetail}
                >
                  <Td>{insured.id}</Td>
                  <Td>{insured.number}</Td>
                  <Td>{insured.last_name}</Td>
                  <Td>{insured.first_name}</Td>
                  <Td>
                    {new Date(insured.birthday).toLocaleDateString('ja-JP')}
                  </Td>
                  <Td>{insured.sex_alias}</Td>
                  <Td>{insured.address}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </ContentLayout>
  );
});

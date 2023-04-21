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
import { useAllInsureds } from './api/useAllInsureds';

export const InsuredList: VFC = memo(() => {
  const { getInsureds, loading, insureds } = useAllInsureds();

  useEffect(() => {
    getInsureds();
  }, [getInsureds]);

  const onClickDetail = () => {
    alert('詳細を表示します');
  };

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Box p={4}>
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
                  <Td>{insured.sex_code}</Td>
                  <Td>{insured.address}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
});

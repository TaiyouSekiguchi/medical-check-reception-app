import { memo, type VFC, type ChangeEvent, useState } from 'react';
import {
  Input,
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
import { useInsureds } from 'hooks/useInsureds';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';

export const ReservationManagement: VFC = memo(() => {
  const { getInsureds, loading, insureds } = useInsureds();
  const [birthday, setBirthday] = useState('');
  const onChangeBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  const onClickSearch = () => {
    getInsureds(birthday);
  };
  const onClickDetail = () => {
    alert('予約管理');
  };

  return (
    <>
      <Input
        placeholder="birthday"
        value={birthday}
        onChange={onChangeBirthday}
      />
      <PrimaryButton
        disabled={birthday === ''}
        loading={false}
        onClick={onClickSearch}
      >
        検索
      </PrimaryButton>
      {insureds.length === 0 ? (
        <p>データがありません</p>
      ) : loading ? (
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

import { memo, type VFC } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { type InsuredResponse } from '../types/insured';

type Props = {
  insureds: InsuredResponse[];
};

export const InsuredTable: VFC<Props> = memo((props) => {
  const { insureds } = props;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>No.</Th>
          <Th>被保険者番号</Th>
          <Th>姓</Th>
          <Th>名</Th>
          <Th>生年月日</Th>
          <Th>性別</Th>
          <Th>住所</Th>
        </Tr>
      </Thead>
      <Tbody>
        {insureds.map((insured, index) => (
          <Tr key={index} _hover={{ bg: 'gray.300' }}>
            <Td>{index + 1}</Td>
            <Td>{insured.number}</Td>
            <Td>{insured.last_name}</Td>
            <Td>{insured.first_name}</Td>
            <Td>{new Date(insured.birthday).toLocaleDateString('ja-JP')}</Td>
            <Td>
              {insured.sex_code === 1
                ? '男性'
                : insured.sex_code === 2
                ? '女性'
                : '不明'}
            </Td>
            <Td>{insured.address}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});

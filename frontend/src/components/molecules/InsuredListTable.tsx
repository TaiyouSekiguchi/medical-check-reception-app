import { memo, type VFC } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { type Insured } from 'types/api/insured';

type Props = {
  insureds: Insured[];
  handleRowClick: (insured: Insured) => void;
};

export const InsuredListTable: VFC<Props> = memo((props) => {
  const { insureds, handleRowClick } = props;

  return (
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
          <Th>予約状況</Th>
        </Tr>
      </Thead>
      <Tbody>
        {insureds.map((insured) => (
          <Tr
            key={insured.id}
            _hover={{ bg: 'gray.300' }}
            onClick={() => {
              handleRowClick(insured);
            }}
          >
            <Td>{insured.id}</Td>
            <Td>{insured.number}</Td>
            <Td>{insured.last_name}</Td>
            <Td>{insured.first_name}</Td>
            <Td>{new Date(insured.birthday).toLocaleDateString('ja-JP')}</Td>
            <Td>{insured.sex_code}</Td>
            <Td>{insured.address}</Td>
            <Td>
              {insured.reservation.length === 0 ? '予約なし' : '予約あり'}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});

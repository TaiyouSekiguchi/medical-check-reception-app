import { memo, type VFC } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import { type InsuredWithReservation } from '../../types/insuredWithReservation';

type Props = {
  insureds: InsuredWithReservation[];
  onClickInsured: (insured: InsuredWithReservation) => void;
};

export const SearchInsuredResultTable: VFC<Props> = memo((props) => {
  const { insureds, onClickInsured } = props;

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
          <Th>予約状況</Th>
        </Tr>
      </Thead>
      <Tbody>
        {insureds.map((insured, index) => (
          <Tr
            key={insured.id}
            _hover={{ bg: 'gray.300' }}
            onClick={() => {
              onClickInsured(insured);
            }}
          >
            <Td>{index + 1}</Td>
            <Td>{insured.number}</Td>
            <Td>{insured.last_name}</Td>
            <Td>{insured.first_name}</Td>
            <Td>{formatStringDate(insured.birthday)}</Td>
            <Td>{insured.sex_alias}</Td>
            <Td>{insured.address}</Td>
            <Td>{insured.is_reserved ? '予約あり' : '予約なし'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});

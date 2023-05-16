import { memo, type VFC } from 'react';
import { Table, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import { type InsuredWithReservation } from '../../types/insuredWithReservation';

type Props = {
  selectedInsured: InsuredWithReservation;
};

export const ReservationStatusTable: VFC<Props> = memo((props) => {
  const { selectedInsured } = props;

  let titles = ['被保険者番号', '氏名', '生年月日', '性別', '住所'];
  let contents = [
    selectedInsured.number,
    `${selectedInsured.last_name} ${selectedInsured.first_name}`,
    formatStringDate(selectedInsured.birthday),
    selectedInsured.sex_alias,
    selectedInsured.address,
  ];

  if (selectedInsured.is_reserved) {
    titles = titles.concat(['検査日', '検査項目']);
    contents = contents.concat([
      formatStringDate(selectedInsured.reservation_date),
      selectedInsured.examination_items.join(', '),
    ]);
  } else {
    titles = titles.concat(['予約状況']);
    contents = contents.concat(['予約なし']);
  }

  return (
    <Table size="md">
      <Tbody>
        {titles.map((title, index) => (
          <Tr key={index}>
            <Th>{title}</Th>
            <Td>{contents[index]}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});

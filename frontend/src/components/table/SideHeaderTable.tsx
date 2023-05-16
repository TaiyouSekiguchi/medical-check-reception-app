import { memo, type VFC } from 'react';
import { Table, Tr, Th, Td, Tbody } from '@chakra-ui/react';

type Props = {
  titles: string[];
  contents: string[];
};

export const SideHeaderTable: VFC<Props> = memo((props) => {
  const { titles, contents } = props;

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

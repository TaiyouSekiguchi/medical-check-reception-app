import { memo, type VFC } from 'react';
import { Spinner, Text, Center } from '@chakra-ui/react';
import { BorderedBox } from 'components/box/BorderedBox';
import { type InsuredWithReservation } from '../types/insuredWithReservation';
import { SearchInsuredResultModal } from './SearchInsuredResultModal';
import { SearchInsuredResultTable } from './SearchInsuredResultTable';

type Props = {
  insuredsWithReservation: InsuredWithReservation[];
  loading: boolean;
  onClickInsured: (insured: InsuredWithReservation) => void;
  isOpen: boolean;
  onClose: () => void;
  selectedInsured: InsuredWithReservation | null;
};

export const SearchInsuredResult: VFC<Props> = memo((props) => {
  const {
    insuredsWithReservation,
    loading,
    onClickInsured,
    isOpen,
    onClose,
    selectedInsured,
  } = props;

  return (
    <BorderedBox h="240px" mt="24px" p="8px" overflowY="auto">
      {insuredsWithReservation.length === 0 ? (
        <Center h="100%">
          <Text size="lg" color="gray.500">
            Search Result
          </Text>
        </Center>
      ) : loading ? (
        <Center h="100%">
          <Spinner />
        </Center>
      ) : (
        <>
          <SearchInsuredResultTable
            insureds={insuredsWithReservation}
            onClickInsured={onClickInsured}
          />
          <SearchInsuredResultModal
            isOpen={isOpen}
            onClose={onClose}
            selectedInsured={selectedInsured}
          />
        </>
      )}
    </BorderedBox>
  );
});

import { memo, type VFC, type ChangeEvent, useState } from 'react';
import { Input, Box, Center, Spinner, useDisclosure } from '@chakra-ui/react';
import { useInsuredsWithReservation } from 'hooks/useInsuredsWithReservation';
import { type Insured } from 'types/api/insured';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';
import { InsuredListModal } from 'components/molecules/InsuredListModal';
import { InsuredListTable } from 'components/molecules/InsuredListTable';

export const ReservationManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getInsuredsWithReservation, insuredsWithReservation, loading } =
    useInsuredsWithReservation();

  const [birthday, setBirthday] = useState('');
  const onChangeBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  const onClickSearch = () => {
    getInsuredsWithReservation(birthday);
  };

  const [selectedInsured, setSelectedInsured] = useState<Insured | null>(null);

  const handleRowClick = (insured: Insured) => {
    setSelectedInsured(insured);
    onOpen();
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
      {insuredsWithReservation.length === 0 ? (
        <></>
      ) : loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Box p={4}>
          <InsuredListTable
            insureds={insuredsWithReservation}
            handleRowClick={handleRowClick}
          />
          <InsuredListModal
            isOpen={isOpen}
            onClose={onClose}
            selectedInsured={selectedInsured}
          />
        </Box>
      )}
    </>
  );
});

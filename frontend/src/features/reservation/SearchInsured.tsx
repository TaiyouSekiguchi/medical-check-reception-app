import { memo, type VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { SearchInputForm } from 'features/reservation/components/SearchInputForm';

export const SearchInsured: VFC = memo(() => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const { getInsuredsWithReservation, insuredsWithReservation, loading } =
  //   useInsuredsWithReservation();

  // const [birthday, setBirthday] = useState('');

  // const onClickSearch = () => {
  //   // getInsuredsWithReservation(birthday);
  // };

  // const [selectedInsured, setSelectedInsured] = useState<Insured | null>(null);

  // const handleRowClick = (insured: Insured) => {
  //   setSelectedInsured(insured);
  //   onOpen();
  // };

  return (
    <ContentLayout title={'予約管理'}>
      <Box ml={24} mt={8}>
        <SearchInputForm />
      </Box>

      {/* {insuredsWithReservation.length === 0 ? (
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
      )} */}
    </ContentLayout>
  );
});

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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useInsureds } from 'hooks/useInsureds';
import { type Insured } from 'types/api/insured';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';

export const ReservationManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getInsureds, loading, insureds } = useInsureds();
  const [birthday, setBirthday] = useState('');
  const onChangeBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  const onClickSearch = () => {
    getInsureds(birthday);
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
                  onClick={() => {
                    handleRowClick(insured);
                  }}
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

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>予約状況</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedInsured === null ? (
                  <></>
                ) : (
                  <VStack>
                    <Box>
                      <strong>ID: </strong>
                      {selectedInsured?.id}
                    </Box>
                    <Box>
                      <strong>被保険者番号: </strong>
                      {selectedInsured?.number}
                    </Box>
                    <Box>
                      <strong>氏名: </strong>
                      {selectedInsured?.last_name} {selectedInsured?.first_name}
                    </Box>
                    <Box>
                      <strong>生年月日: </strong>
                      {new Date(selectedInsured?.birthday).toLocaleDateString(
                        'ja-JP'
                      )}
                    </Box>
                    <Box>
                      <strong>性別: </strong>
                      {selectedInsured?.sex_code}
                    </Box>
                    <Box>
                      <strong>住所: </strong>
                      {selectedInsured?.address}
                    </Box>
                  </VStack>
                )}
              </ModalBody>
              <ModalFooter>
                <Button>予約</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
});

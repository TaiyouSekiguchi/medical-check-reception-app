import { memo, type VFC } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react';
import { usePapaParse } from 'react-papaparse';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useGetInsuredsForExport } from './api/useGetInsuredsForExport';

export const DataExport: VFC = memo(() => {
  const { getInsuredsForExport, insuredsForExport } = useGetInsuredsForExport();

  const { jsonToCSV } = usePapaParse();

  const onClickDataFetch = () => {
    getInsuredsForExport();
  };

  const onClickDownload = () => {
    const results = jsonToCSV(insuredsForExport);
    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.setAttribute('download', 'submit.csv');
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <ContentLayout title="Data Export">
      <Box pb="24px">
        <PrimaryButton onClick={onClickDataFetch}>予約情報取得</PrimaryButton>
      </Box>
      {insuredsForExport.length === 0 ? (
        <></>
      ) : (
        <Box>
          <BorderedBox p="16px">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>被保険者番号</Th>
                  <Th>姓</Th>
                  <Th>名</Th>
                  <Th>生年月日</Th>
                  <Th>性別</Th>
                  <Th>住所</Th>
                  <Th>受診日</Th>
                  <Th>胃カメラ</Th>
                  <Th>バリウム</Th>
                  <Th>乳がん</Th>
                  <Th>前立腺がん</Th>
                </Tr>
              </Thead>
              <Tbody>
                {insuredsForExport.map((insured) => (
                  <Tr key={insured.id} _hover={{ bg: 'gray.300' }}>
                    <Td>{insured.id}</Td>
                    <Td>{insured.number}</Td>
                    <Td>{insured.last_name}</Td>
                    <Td>{insured.first_name}</Td>
                    <Td>
                      {new Date(insured.birthday).toLocaleDateString('ja-JP')}
                    </Td>
                    <Td>{insured.sex_alias}</Td>
                    <Td>{insured.address}</Td>
                    <Td>
                      {new Date(insured.reservation_date).toLocaleDateString(
                        'ja-JP'
                      )}
                    </Td>
                    <Td>
                      {insured.is_gastrointestinal_endoscopy_reserved
                        ? '○'
                        : '―'}
                    </Td>
                    <Td>{insured.is_barium_reserved ? '○' : '―'}</Td>
                    <Td>
                      {insured.is_breast_cancer_screening_reserved ? '○' : '―'}
                    </Td>
                    <Td>
                      {insured.is_prostate_cancer_screening_reserved
                        ? '○'
                        : '―'}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </BorderedBox>
          <Flex m="24px" justifyContent="flex-end">
            <PrimaryButton onClick={onClickDownload}>
              ダウンロード
            </PrimaryButton>
          </Flex>
        </Box>
      )}
    </ContentLayout>
  );
});

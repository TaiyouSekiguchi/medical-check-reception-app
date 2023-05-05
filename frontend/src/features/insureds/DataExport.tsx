import { memo, type VFC } from 'react';
import { Text, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useGetInsuredsForExport } from './api/useGetInsuredsForExport';

export const DataExport: VFC = memo(() => {
  const { getInsuredsForExport, insuredsForExport } = useGetInsuredsForExport();

  const onClickDataFetch = () => {
    getInsuredsForExport();
  };

  const onClickDownload = () => {
    alert('ダウンロードします');
  };

  return (
    <ContentLayout title="Data Export">
      <PrimaryButton onClick={onClickDataFetch}>予約情報取得</PrimaryButton>
      {insuredsForExport.length === 0 ? (
        <></>
      ) : (
        <Box p={4}>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>被保険者番号</Th>
                <Th>姓</Th>
                <Th>名</Th>
                <Th>ｾｲ</Th>
                <Th>ﾒｲ</Th>
                <Th>生年月日</Th>
                <Th>性別</Th>
                <Th>住所</Th>
                <Th>受診日</Th>
                <Th>基本検査</Th>
                <Th>胃カメラ検査</Th>
                <Th>バリウム検査</Th>
                <Th>乳がん検査</Th>
                <Th>前立腺がん検査</Th>
              </Tr>
            </Thead>
            <Tbody>
              {insuredsForExport.map((insured) => (
                <Tr key={insured.id} _hover={{ bg: 'gray.300' }}>
                  <Td>{insured.id}</Td>
                  <Td>{insured.number}</Td>
                  <Td>{insured.last_name}</Td>
                  <Td>{insured.first_name}</Td>
                  <Td>{insured.last_name_kana}</Td>
                  <Td>{insured.first_name_kana}</Td>
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
                  <Td>{insured.is_basic_reserved ? '○' : '―'}</Td>
                  <Td>
                    {insured.is_gastrointestinal_endoscopy_reserved ? '○' : '―'}
                  </Td>
                  <Td>{insured.is_barium_reserved ? '○' : '―'}</Td>
                  <Td>
                    {insured.is_breast_cancer_screening_reserved ? '○' : '―'}
                  </Td>
                  <Td>
                    {insured.is_prostate_cancer_screening_reserved ? '○' : '―'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box>
            <Text>
              この内容でよろしいですか？
              良ければダウンロードボタンを押してください。
            </Text>
            <PrimaryButton onClick={onClickDownload}>
              ダウンロード
            </PrimaryButton>
          </Box>
        </Box>
      )}
    </ContentLayout>
  );
});

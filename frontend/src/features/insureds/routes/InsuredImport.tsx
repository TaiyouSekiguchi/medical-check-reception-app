import { memo, useState, type VFC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import StyledFileDrop from 'components/fileDlop/StyledFileDrop';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useCreateInsureds } from '../api/useCreateInsureds';
import { InsuredImportTable } from '../components/InsuredImportTable';
import { type InsuredRequest } from '../types/insured';

export const InsuredImport: VFC = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [insureds, setInsured] = useState<InsuredRequest[]>([]);
  const { createInsureds } = useCreateInsureds();

  const onClickImport = async () => {
    await createInsureds(insureds);
  };

  const setFunction = (arg: InsuredRequest[]) => {
    setInsured(arg);
  };

  return (
    <ContentLayout title="被保険者インポート">
      {!isLoaded ? (
        <StyledFileDrop<InsuredRequest[]>
          setIsLoaded={setIsLoaded}
          setFunction={setFunction}
        />
      ) : (
        <Box>
          <BorderedBox p="24px">
            <InsuredImportTable insureds={insureds} />
          </BorderedBox>
          <Flex m="16px" justifyContent="flex-end">
            <PrimaryButton onClick={onClickImport}>import</PrimaryButton>
          </Flex>
        </Box>
      )}
    </ContentLayout>
  );
});

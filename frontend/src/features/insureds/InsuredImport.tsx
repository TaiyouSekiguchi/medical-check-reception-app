import { memo, useState, type VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import StyledFileDrop from 'components/fileDlop/StyledFileDrop';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useCreateInsureds } from './api/useCreateInsureds';
import { InsuredImportTable } from './components/InsuredImportTable';
import { type InsuredRequest } from './types/insured';

export const InsuredImport: VFC = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [insureds, setInsured] = useState<InsuredRequest[]>([]);
  const { createInsureds } = useCreateInsureds();

  const onClickImport = async () => {
    await createInsureds(insureds);
  };

  const handleFunction = (arg: InsuredRequest[]) => {
    setInsured(arg);
  };

  return (
    <ContentLayout title="被保険者インポート">
      {!isLoaded ? (
        <StyledFileDrop<InsuredRequest[]>
          setIsLoaded={setIsLoaded}
          setFunction={handleFunction}
        />
      ) : (
        <Box>
          <InsuredImportTable insureds={insureds} />
          <PrimaryButton onClick={onClickImport}>import</PrimaryButton>
        </Box>
      )}
    </ContentLayout>
  );
});

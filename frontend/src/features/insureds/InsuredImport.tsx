import { memo, useState, type VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useCreateInsureds } from './api/useCreateInsureds';
import { InsuredFileDrop } from './components/InsureFileDrop';
import { InsuredImportTable } from './components/InsuredImportTable';
import { type InsuredRequest } from './types/insured';

export const InsuredImport: VFC = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [insureds, setInsured] = useState<InsuredRequest[]>([]);
  const { createInsureds } = useCreateInsureds();

  const onClickImport = async () => {
    await createInsureds(insureds);
  };

  return (
    <ContentLayout title="被保険者インポート">
      {!isLoaded ? (
        <InsuredFileDrop setIsLoaded={setIsLoaded} setInsured={setInsured} />
      ) : (
        <Box>
          <InsuredImportTable insureds={insureds} />
          <PrimaryButton onClick={onClickImport}>import</PrimaryButton>
        </Box>
      )}
    </ContentLayout>
  );
});

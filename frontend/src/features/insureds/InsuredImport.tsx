import { useCallback, memo, useMemo, useState, type VFC } from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { usePapaParse } from 'react-papaparse';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { useCreateInsureds } from './api/useCreateInsureds';
import { type InsuredRequest } from './types/insured';

const baseStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: 200,
  height: 150,
};

const borderNormalStyle = {
  border: '1px dotted #888',
};

const borderDragStyle = {
  border: '1px solid #00f',
  transition: 'border .5s ease-in-out',
};

export const InsuredImport: VFC = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [insureds, setInsured] = useState<InsuredRequest[]>([]);
  const { createInsureds } = useCreateInsureds();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        console.log('file reading was aborted');
      };
      reader.onerror = () => {
        console.log('file reading has failed');
      };
      reader.onload = () => {
        // Do whatever you want with the file contents
        const csvString = reader.result as string;
        readString<InsuredRequest>(csvString, {
          header: true,
          worker: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log('---------------------------');
            console.log(results.data);
            console.log('---------------------------');
            setInsured(results.data);
            setIsLoaded(true);
          },
        });
      };
      reader.readAsText(file);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { readString } = usePapaParse();

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? borderDragStyle : borderNormalStyle),
    }),
    [isDragActive]
  );

  const onClickImport = async () => {
    // TODO: ここでAPIを叩く
    await createInsureds(insureds);
  };

  return (
    <div className="container">
      {!isLoaded ? (
        <>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>{'Drag n drop some files here'}</p>
            )}
            <button
              type="button"
              onClick={open}
              className="btn btn-primary align-self-center"
            >
              Select files
            </button>
          </div>
        </>
      ) : (
        <>
          <Box>
            <Table>
              <Thead>
                <Tr>
                  <Th>被保険者番号</Th>
                  <Th>姓</Th>
                  <Th>名</Th>
                  <Th>生年月日</Th>
                  <Th>性別コード</Th>
                  <Th>住所</Th>
                </Tr>
              </Thead>
              <Tbody>
                {insureds.map((insured, index) => (
                  <Tr key={index} _hover={{ bg: 'gray.300' }}>
                    <Td>{insured.number}</Td>
                    <Td>{insured.last_name}</Td>
                    <Td>{insured.first_name}</Td>
                    <Td>{insured.birthday}</Td>
                    <Td>{insured.sex_code}</Td>
                    <Td>{insured.address}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <PrimaryButton onClick={onClickImport}>import</PrimaryButton>
        </>
      )}
    </div>
  );
});

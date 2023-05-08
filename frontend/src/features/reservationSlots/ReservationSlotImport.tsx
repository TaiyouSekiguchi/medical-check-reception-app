import { useCallback, memo, useMemo, useState, type VFC } from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { usePapaParse } from 'react-papaparse';
import { PrimaryButton } from 'components/buttons/PrimaryButton';

import { useCreateReservationSlots } from './api/useCreateReservationSlots';
import { type ReservationSlotResponse } from './types/reservationSlot';

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

export const ReservationSlotImport: VFC = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reservationSlots, setReservationSlots] = useState<
    ReservationSlotResponse[]
  >([]);

  const { createReservationSlots } = useCreateReservationSlots();

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
        readString<ReservationSlotResponse>(csvString, {
          header: true,
          worker: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log('---------------------------');
            console.log(results.data);
            console.log('---------------------------');
            setReservationSlots(results.data);
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
    await createReservationSlots(reservationSlots);
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
                  <Th>日付</Th>
                  <Th>基本検査枠数</Th>
                  <Th>胃カメラ検査枠数</Th>
                  <Th>バリウム検査枠数</Th>
                  <Th>乳がん検査枠数</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reservationSlots.map((reservationSlot, index) => (
                  <Tr key={index} _hover={{ bg: 'gray.300' }}>
                    <Td>{reservationSlot.date}</Td>
                    <Td>{reservationSlot.basic}</Td>
                    <Td>{reservationSlot.gastrointestinal_endoscopy}</Td>
                    <Td>{reservationSlot.barium}</Td>
                    <Td>{reservationSlot.breast_cancer_screening}</Td>
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

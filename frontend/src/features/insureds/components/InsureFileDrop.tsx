import { useCallback, memo, useMemo, type VFC } from 'react';
import { useMessage } from 'features/message/hooks/useMessage';
import { useDropzone } from 'react-dropzone';
import { usePapaParse } from 'react-papaparse';
import { type InsuredRequest } from '../types/insured';

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

type Props = {
  setIsLoaded: (isLoaded: boolean) => void;
  setInsured: (insureds: InsuredRequest[]) => void;
};

export const InsuredFileDrop: VFC<Props> = memo((props) => {
  const { setIsLoaded, setInsured } = props;
  const { readString } = usePapaParse();
  const { showMessage } = useMessage();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => {
        console.log('file reading was aborted');
        showMessage({
          title: 'ファイルの読み込みを中止しました',
          status: 'error',
        });
      };
      reader.onerror = () => {
        showMessage({
          title: 'ファイルの読み込みに失敗しました',
          status: 'error',
        });
      };
      reader.onload = () => {
        const csvString = reader.result as string;
        readString<InsuredRequest>(csvString, {
          header: true,
          worker: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            showMessage({
              title: 'ファイルの読み込みに成功しました',
              status: 'success',
            });
            setInsured(results.data);
            setIsLoaded(true);
          },
        });
      };
      reader.readAsText(file);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
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
  );
});

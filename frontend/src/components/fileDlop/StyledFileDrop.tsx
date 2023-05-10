import { useCallback, memo, useMemo } from 'react';
import { useMessage } from 'features/message/hooks/useMessage';
import { useDropzone } from 'react-dropzone';
import { usePapaParse } from 'react-papaparse';

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface Props<T> {
  setIsLoaded: (isLoaded: boolean) => void;
  setFunction: (arg: T) => void;
}

const StyledFileDrop = <T,>(props: Props<T>): JSX.Element => {
  const { setIsLoaded, setFunction } = props;
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
        readString(csvString, {
          header: true,
          worker: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            showMessage({
              title: 'ファイルの読み込みに成功しました',
              status: 'success',
            });
            setFunction(results.data as T);
            setIsLoaded(true);
          },
        });
      };
      reader.readAsText(file);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{`Drag 'n' drop some files here, or click to select files`}</p>
      </div>
    </div>
  );
};

export default memo(StyledFileDrop) as typeof StyledFileDrop;

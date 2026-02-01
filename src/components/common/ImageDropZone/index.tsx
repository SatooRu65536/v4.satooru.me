import { uploadImageServer } from '@/functions/uploadImage';
import styles from './index.module.scss';
import { useDropzone } from 'react-dropzone';

interface ImageDropZoneProps {
  value?: string;
  onChange: (url: string) => void;
}

export function ImageDropZone({ value, onChange }: ImageDropZoneProps) {
  console.log({ value });
  const onDrop = (files: File[]) => {
    if (files.length !== 1) {
      alert('画像は1枚だけアップロードしてください。');
      return;
    }

    const droppedImage = files[0];

    const reader = new FileReader();

    reader.readAsDataURL(droppedImage);
    reader.onload = () => {
      void upload(droppedImage).then(onChange);
    };
  };

  const upload = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const res = await uploadImageServer({
      data: { content: uint8Array, filename: file.name },
    });

    return res.url;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.dropzone} data-dragging={isDragActive}>
      {value && <img src={value} className={styles.preview} alt="プレビュー画像" />}
      <input {...getInputProps()} />
      {!value && <p className={styles.message}>画像をドラッグ&ドロップしてください。</p>}
    </div>
  );
}

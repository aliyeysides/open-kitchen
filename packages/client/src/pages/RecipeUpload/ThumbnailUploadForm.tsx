import UploadButton from '../../components/inputs/UploadButton';

interface ThumbnailUploadFormProps {
  onChange: ({
    target: {
      validity,
      files: [file],
    },
  }: any) => void;
}

export default function ThumbnailUploadForm({
  onChange,
}: ThumbnailUploadFormProps) {
  return <UploadButton label="Add Thumbnail" onChange={onChange} />;
}

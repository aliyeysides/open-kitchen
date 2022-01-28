import UploadButton from '../../components/UploadButton';

interface ThumbnailUploadStepProps {
  onChange: ({
    target: {
      validity,
      files: [file],
    },
  }: any) => void;
}

export default function ThumbnailUploadStep({
  onChange,
}: ThumbnailUploadStepProps) {
  return <UploadButton label="Add Thumbnail" onChange={onChange} />;
}

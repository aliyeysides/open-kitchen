import UploadButton from '../../components/UploadButton';

interface VideoUploadStepProps {
  onChange: ({
    target: {
      validity,
      files: [file],
    },
  }: any) => void;
}

export default function VideoUploadStep({ onChange }: VideoUploadStepProps) {
  return <UploadButton label="Add Video" onChange={onChange} />;
}

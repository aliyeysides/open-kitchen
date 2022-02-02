import UploadButton from '../../components/UploadButton';

interface VideoUploadFormProps {
  onChange: ({
    target: {
      validity,
      files: [file],
    },
  }: any) => void;
}

export default function VideoUploadForm({ onChange }: VideoUploadFormProps) {
  return <UploadButton label="Add Video" onChange={onChange} />;
}

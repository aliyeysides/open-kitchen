import { useParams } from 'react-router-dom';

export default function TagPage() {
  const params = useParams();
  return <>tag {params.tag} page</>;
}

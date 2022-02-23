import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

interface ActionAreaCardProps {
  title: string;
  thumbnail: string;
}

export default function ActionAreaCard({
  title,
  thumbnail,
}: ActionAreaCardProps) {
  return (
    <Card variant="outlined" sx={{ maxWidth: '100%', maxHeight: '100%' }}>
      <CardActionArea>
        <CardMedia component="img" src={thumbnail} alt="green iguana" />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={title}
        />
      </CardActionArea>
    </Card>
  );
}

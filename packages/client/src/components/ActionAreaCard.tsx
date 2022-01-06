import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";

interface ActionAreaCardProps {
  title: string;
  thumbnail: string;
}

export default function ActionAreaCard({
  title,
  thumbnail,
}: ActionAreaCardProps) {
  return (
    <Card variant="outlined" sx={{ maxWidth: "100%", maxHeight: "100%" }}>
      <CardActionArea>
        <CardMedia component="img" src={thumbnail} alt="green iguana" />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent> */}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={title}
          // subheader="September 14, 2016"
        />
      </CardActionArea>
    </Card>
  );
}

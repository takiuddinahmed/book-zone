import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IBook } from "backend/src/book";
import { Link as RouterLink } from "react-router-dom";

interface BookCardProps {
  book: IBook;
}

const getDownloadUrl = (url: string) => {
  return import.meta.env.VITE_BACKEND_URL + url;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Card
      component={RouterLink}
      to={"/book/" + book._id}
      sx={{
        height: "100%",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        textDecoration: "none",
        ":hover": {
          transition: "all .2s ease-in-out",
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: "250px",
        }}
        image={getDownloadUrl(book.imageUrl)}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {book.name}
        </Typography>
        <Typography>{book.author.name}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}

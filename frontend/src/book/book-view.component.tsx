import { useParams } from "react-router-dom";
import { PublicRoute } from "../parent/public-route.component";
import { trpc } from "../lib/trpc";
import { useState } from "react";
import { IBook } from "backend/src/book";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Banner } from "../components/banner.component";

const getDownloadUrl = (url: string) => {
  return import.meta.env.VITE_BACKEND_URL + url;
};
export function BookView() {
  const { bookId } = useParams();
  const bookQuery = trpc.book.getById.useQuery({ _id: bookId || "" });

  if (bookQuery.isLoading)
    return (
      <PublicRoute>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Loading.. Please Wait..
        </Typography>
      </PublicRoute>
    );
  if (bookQuery.error)
    return (
      <PublicRoute>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Book Not found
        </Typography>
      </PublicRoute>
    );

  const book = bookQuery.data as IBook;

  return (
    <PublicRoute>
      <Grid container gap={5} justifyContent="center" alignItems="center">
        <Grid item>
          <Box
            component="img"
            sx={{
              height: 400,
              // width: 350,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src={getDownloadUrl(book.imageUrl || "")}
          />
        </Grid>
        <Grid item>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5"> {book.name}</Typography>
            {book.description && book.description.length && (
              <Typography> {book.description || "-"}</Typography>
            )}
            <Typography> Author: {book.author.name}</Typography>
            <Typography>Category: {book.category.name}</Typography>
            <Button
              color="primary"
              variant="contained"
              component="a"
              href={getDownloadUrl(book.fileUrl)}
              download
            >
              Download
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            paddingTop: "56.25%",
          }}
        >
          <iframe
            src={getDownloadUrl(book.fileUrl)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              height: "800px",
            }}
          ></iframe>
        </div>
      </Box>
    </PublicRoute>
  );
}

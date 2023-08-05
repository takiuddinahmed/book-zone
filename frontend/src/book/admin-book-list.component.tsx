import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "../lib/trpc";
import { PrivateRoute } from "../parent/private-route.component";
import { IBook } from "backend/src/book";
import FileUpload from "react-material-file-upload";

type IBookData = IBook & {
  authorName: string;
  categoryName: string;
};

export function AdminBookList() {
  const [bookData, setBookData] = useState<IBookData[]>([]);
  const bookListQuery = trpc.book.get.useQuery({});
  const categoryListQuery = trpc.category.getAll.useQuery();
  const authorListQuery = trpc.author.getAll.useQuery();
  const createBookMutation = trpc.book.create.useMutation();
  const deleteBookMutation = trpc.book.delete.useMutation();
  const [files, setFiles] = useState<File[]>([]);
  const [createFormData, setCreateFormData] = useState<
    Pick<IBook, "name" | "description" | "authorId" | "categoryId">
  >({
    name: "",
    description: "",
    authorId: "",
    categoryId: "",
  });

  const updateFormData = (field: string, value: string) => {
    setCreateFormData((prev) => ({ ...prev, [field]: value }));
  };

  const columns: MUIDataTableColumnDef[] = [
    {
      name: "_id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "authorName",
      label: "Author",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "categoryName",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "fileUrl",
      label: "File Url",
      options: {
        display: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (_, { rowData }) => {
          return (
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                component="a"
                href={`${import.meta.env.VITE_BACKEND_URL}${rowData[4]}`}
                variant="outlined"
                color="info"
                download
              >
                Download
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteBookMutation.mutate({ _id: rowData[0] })}
              >
                Delete
              </Button>
            </Box>
          );
        },
      },
    },
  ];

  useEffect(() => {
    if (bookListQuery.data) {
      setBookData(
        (bookListQuery.data as IBook[]).map((book) => ({
          ...book,
          authorName: book.author.name,
          categoryName: book.category.name,
        }))
      );
    }
  }, [bookListQuery.data]);

  // create handle

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const onCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files.length) {
      toast.error("Please upload file");
      return;
    }
    const fileForm = new FormData();
    fileForm.append("file", files[0]);
    console.log({ fileForm, files });
    const fileRes = await fetch(import.meta.env.VITE_BACKEND_URL + "/file", {
      method: "POST",
      body: fileForm,
    });
    const fileData: { success: boolean; fileUrl: string } =
      await fileRes.json();
    if (!fileData.success) {
      toast.error("Unable to file upload. Try again");
      return;
    }
    createBookMutation.mutate({
      ...createFormData,
      fileUrl: fileData.fileUrl.toString(),
    });
  };

  useEffect(() => {
    if (createBookMutation.isSuccess) {
      setBookData((prev) => [
        ...prev,
        {
          ...(createBookMutation.data as IBook),
          authorName: createBookMutation.data.author.name,
          categoryName: createBookMutation.data.category.name,
        },
      ]);
      createBookMutation.reset();
    }
    if (createBookMutation.isError) {
      toast(createBookMutation.error.message);
      createBookMutation.reset();
    }
  }, [createBookMutation]);

  useEffect(() => {
    if (deleteBookMutation.isSuccess) {
      setBookData((prev) =>
        prev.filter((d) => d._id !== deleteBookMutation.data._id)
      );
      deleteBookMutation.reset();
    }
    if (deleteBookMutation.isError) {
      toast(deleteBookMutation.error.message);
      deleteBookMutation.reset();
    }
  }, [deleteBookMutation]);

  return (
    <PrivateRoute>
      <MUIDataTable
        columns={columns}
        title="All Authors"
        data={bookData || []}
        options={{
          customToolbar: () => (
            <Button
              onClick={() => setOpenCreateDialog(true)}
              variant="outlined"
            >
              Create Book
            </Button>
          ),
        }}
      />
      <Dialog open={openCreateDialog}>
        <DialogTitle>Create Book</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={onCreateSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Book Name"
              name="name"
              value={createFormData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline={true}
              minRows={3}
              value={createFormData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
            />

            <FileUpload sx={{ mt: 2 }} value={files} onChange={setFiles} />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={createFormData.categoryId}
                label="Category"
                required
                onChange={(e) => updateFormData("categoryId", e.target.value)}
              >
                {(categoryListQuery.data || []).map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="author-select-label">Author</InputLabel>
              <Select
                labelId="author-select-label"
                id="author-select"
                value={createFormData.authorId}
                label="Author"
                required
                onChange={(e) => updateFormData("authorId", e.target.value)}
              >
                {(authorListQuery.data || []).map((auth) => (
                  <MenuItem key={auth._id} value={auth._id}>
                    {auth.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setOpenCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </PrivateRoute>
  );
}

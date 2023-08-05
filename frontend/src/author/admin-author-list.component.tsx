import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { IAuthor } from "backend/src/author/author.model";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "../lib/trpc";
import { PrivateRoute } from "../parent/private-route.component";

export function AdminAuthorList() {
  const [authorData, setAuthorData] = useState<IAuthor[]>([]);
  const authorListQuery = trpc.author.getAll.useQuery();
  const createAuthorMutation = trpc.author.create.useMutation();
  const deleteAuthorMutation = trpc.author.delete.useMutation();

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
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (_, { rowData }) => {
          return (
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteAuthorMutation.mutate({ _id: rowData[0] })}
            >
              Delete
            </Button>
          );
        },
      },
    },
  ];

  useEffect(() => {
    if (authorListQuery.data) {
      setAuthorData(authorListQuery.data);
    }
  }, [authorListQuery.data]);

  // create handle

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const onCreateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = (data.get("name") as string) || "";
    if (!name || !name?.length) {
      toast.error("Please provide name");
    } else {
      createAuthorMutation.mutate({ name });
      setOpenCreateDialog(false);
      // categoryListQuery.
    }
  };

  useEffect(() => {
    if (createAuthorMutation.isSuccess) {
      setAuthorData((prev) => [...prev, createAuthorMutation.data]);
      createAuthorMutation.reset();
    }
  }, [createAuthorMutation.isSuccess]);

  useEffect(() => {
    if (createAuthorMutation.isSuccess) {
      // setCategoryData((prev) => [...prev, createCategoryMutation.data]);
      createAuthorMutation.reset();
    }
    if (createAuthorMutation.isError) {
      toast(createAuthorMutation.error.message);
      createAuthorMutation.reset();
    }
  }, [createAuthorMutation]);

  useEffect(() => {
    if (deleteAuthorMutation.isSuccess) {
      setAuthorData((prev) =>
        prev.filter((d) => d._id !== deleteAuthorMutation.data._id)
      );
      deleteAuthorMutation.reset();
    }
    if (deleteAuthorMutation.isError) {
      toast(deleteAuthorMutation.error.message);
      deleteAuthorMutation.reset();
    }
  }, [deleteAuthorMutation]);

  return (
    <PrivateRoute>
      <MUIDataTable
        columns={columns}
        title="All Authors"
        data={authorData || []}
        options={{
          customToolbar: () => (
            <Button
              onClick={() => setOpenCreateDialog(true)}
              variant="outlined"
            >
              Create Author
            </Button>
          ),
        }}
      />
      <Dialog open={openCreateDialog}>
        <DialogTitle>Create Author</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={onCreateSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Author Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
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

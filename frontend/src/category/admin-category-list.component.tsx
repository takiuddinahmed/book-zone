import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { trpc } from "../lib/trpc";
import { PrivateRoute } from "../parent/private-route.component";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ICategory } from "backend/src/category/category.model";

export function AdminCategoryList() {
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const categoryListQuery = trpc.category.getAll.useQuery();
  const createCategoryMutation = trpc.category.create.useMutation();
  const deleteCategoryMutation = trpc.category.delete.useMutation();

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
              onClick={() => deleteCategoryMutation.mutate({ _id: rowData[0] })}
            >
              Delete
            </Button>
          );
        },
      },
    },
  ];

  useEffect(() => {
    if (categoryListQuery.data) {
      setCategoryData(categoryListQuery.data);
    }
  }, [categoryListQuery.data]);

  // create handle

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const onCreateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = (data.get("name") as string) || "";
    if (!name || !name?.length) {
      toast.error("Please provide name");
    } else {
      createCategoryMutation.mutate({ name });
      setOpenCreateDialog(false);
      // categoryListQuery.
    }
  };

  useEffect(() => {
    if (createCategoryMutation.isSuccess) {
      setCategoryData((prev) => [...prev, createCategoryMutation.data]);
      createCategoryMutation.reset();
    }
  }, [createCategoryMutation.isSuccess]);

  useEffect(() => {
    if (createCategoryMutation.isSuccess) {
      // setCategoryData((prev) => [...prev, createCategoryMutation.data]);
      createCategoryMutation.reset();
    }
    if (createCategoryMutation.isError) {
      toast(createCategoryMutation.error.message);
      createCategoryMutation.reset();
    }
  }, [createCategoryMutation]);

  useEffect(() => {
    if (deleteCategoryMutation.isSuccess) {
      setCategoryData((prev) =>
        prev.filter((d) => d._id !== deleteCategoryMutation.data._id)
      );
      deleteCategoryMutation.reset();
    }
    if (deleteCategoryMutation.isError) {
      toast(deleteCategoryMutation.error.message);
      deleteCategoryMutation.reset();
    }
  }, [deleteCategoryMutation]);

  return (
    <PrivateRoute>
      <MUIDataTable
        columns={columns}
        title="All Categories"
        data={categoryData || []}
        options={{
          customToolbar: () => (
            <Button
              onClick={() => setOpenCreateDialog(true)}
              variant="outlined"
            >
              Create Category
            </Button>
          ),
        }}
      />
      <Dialog open={openCreateDialog}>
        <DialogTitle>Create Category</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={onCreateSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Category Name"
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

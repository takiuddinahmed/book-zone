import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { Link } from "react-router-dom";

export const AdminSidePanelMenuList = (
  <React.Fragment>
    <Link to={"/admin/book"}>
      <ListItemButton>
        <ListItemText primary="Books" />
      </ListItemButton>
    </Link>
    <Link to={"/admin/author"}>
      <ListItemButton>
        <ListItemText primary="Authors" />
      </ListItemButton>
    </Link>

    <ListItemButton>
      <Link to={"/admin/category"} className="">
        <ListItemText primary="Categories" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);

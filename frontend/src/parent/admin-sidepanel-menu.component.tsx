import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

export const AdminSidePanelMenuList = (
  <React.Fragment>
    <ListItemButton>
      <ListItemText primary="Authors" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Categories" />
    </ListItemButton>
  </React.Fragment>
);

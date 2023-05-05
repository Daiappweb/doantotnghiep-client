import { Dialog,DialogContent,DialogTitle } from "@material-ui/core";
import { Typography } from "@mui/material";
import React from "react";

function DialogApp  (props){
  const {title,children,openPopup,handleClosePopup} = props;

  return (
    <Dialog open={openPopup} onClose={handleClosePopup}>
      <DialogTitle>
        <Typography>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}
export default DialogApp;
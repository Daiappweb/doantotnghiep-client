import { Dialog,DialogContent,DialogTitle } from "@material-ui/core";
import { Typography } from "@mui/material";
import React from "react";

function DialogApp  (props){
  const {title,children,openPopup,handleClosePopup, maxWidth} = props;

  return (
    // nếu k truyền gì thì mặc định sm , còn truyền thì nhận giá trị truyền
    <Dialog fullWidth maxWidth={maxWidth || "sm"} open={openPopup} onClose={handleClosePopup}>
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
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface IErrorDialogProps {
  errorObj: FetchBaseQueryError;
}

function ErrorDialog(props: IErrorDialogProps): JSX.Element {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    window.location.reload();
    setOpen(false);
  };

  React.useEffect(() => {
    console.log(props.errorObj);
  }, [props.errorObj]);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {getErrorString(props.errorObj)}
        </DialogTitle>
        <DialogContent>
          <i>{props.errorObj.status}</i>
          <br />
          Check console for more details
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose}>Reload Browser</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function getErrorString(errorObj: FetchBaseQueryError): string {
  switch (errorObj.status) {
    case "FETCH_ERROR":
      return errorObj.error || "Fetch error";
    case "PARSING_ERROR":
      return errorObj.error || "Parsing error";
    case "TIMEOUT_ERROR":
      return errorObj.error || "Request timed out";
    case "CUSTOM_ERROR":
      return errorObj.error || "Custom error";
    default:
      return `ERR_CODE ${errorObj.status}`;
  }
}

export default ErrorDialog;

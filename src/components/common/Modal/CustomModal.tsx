import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import { Button, Dialog, DialogProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactElement } from "react";

export interface CustomModalProps {
  dialogProps: DialogProps;
  children: ReactElement | ReactElement[];
  title?: string;
  actions?: ReactElement ;
}

const CustomModal = ({
  children,
  dialogProps,
  title,
  actions,
}: CustomModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog fullScreen={fullScreen} {...dialogProps}>
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default CustomModal;

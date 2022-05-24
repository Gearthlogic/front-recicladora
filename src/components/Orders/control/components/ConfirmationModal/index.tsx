import { Button, Grid, Typography } from "@material-ui/core";
import { memo } from "react";
import { useGlobalLoader } from "../../../../../hooks/UseGlobalLoader";
import { endControlling } from "../../../../../services/api/orders";
import CustomModal from "../../../../common/Modal/CustomModal";

interface ConfirmationModalProps {
  onClose: () => void;
  id?: number;
  setData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}

function ConfirmationModal({ onClose, id, setData }: ConfirmationModalProps) {
  const submitEndControlling = useGlobalLoader(async () => {
    if (id) {
      await endControlling(id);
      setData((prev) => prev?.filter((order) => order.id !== id));
      onClose();
    }
  });

  return (
    <CustomModal
      actions={
        <Grid container justifyContent="space-around">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={submitEndControlling}
          >
            Confirmar
          </Button>
        </Grid>
      }
      dialogProps={{ open: !!id, onClose }}
    >
      <Typography>
        Esta por confrimar el control de la orden. ¿Desea continuar?
      </Typography>
    </CustomModal>
  );
}

export default memo(ConfirmationModal);

import { Button, Dialog } from '@mui/material'

interface Props {
   children?: any;
   onClose?: any;
   open?: boolean;
}

const CustomModal = ({
   children,
   onClose = () => { },
   open = false,
}: Props) => {

   return (
      <Dialog
         open={open}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <div style={{ width: 'auto', height: 'auto' }}>
            {children}
         </div>

         <Button
            onClick={onClose}
         >
            Cerrar
         </Button>
      </Dialog>
   )
}

export default CustomModal
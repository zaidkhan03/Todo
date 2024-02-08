import { useMutation } from "@apollo/client";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { updateTask } from "@/queries/queries";
import InputForm, { FormValues } from "./InputForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type UpdateTodoProps = {
  id: string;
  title: string;
  completed: boolean;
};

export default function UpdateTodo({ id, title, completed }: UpdateTodoProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updateTodo, { loading }] = useMutation(updateTask);

  const handleSubmit = async ({ title, completed }: FormValues) => {
    try {
      await updateTodo({
        variables: { id: id, title: title, completed: completed },
      });
      handleClose();
    } catch (err) {
      console.log("Failed to Update Todo");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Update
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <InputForm
            loading={loading}
            onSubmit={handleSubmit}
            initialValue={{ title: title, completed: completed }}
          />
        </Box>
      </Modal>
    </div>
  );
}

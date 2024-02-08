import { gql, useMutation } from "@apollo/client";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { addTodo } from "@/queries/queries";
import InputForm, { FormValues } from "./InputForm";
import { transform } from "next/dist/build/swc";

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

export default function AddTodo() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createTodo, { loading }] = useMutation(addTodo, {
    update(cache, { data: { createTodo } }) {
      cache.modify({
        fields: {
          allTodos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: createTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                }
              `,
            });

            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  function getRandomDate(startDate: Date, endDate: Date) {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeDiff;
    const randomDate = new Date(startDate.getTime() + randomTime);
    return randomDate.toString();
  }

  const handleSubmit = async ({ title, completed }: FormValues) => {
    try {
      const startDate = new Date("2024-02-01");
      const endDate = new Date("2024-02-29");
      await createTodo({
        variables: {
          title: title,
          completed: completed,
          createdAt: getRandomDate(startDate, endDate),
        },
      });
      handleClose();
    } catch (err) {
      console.log("Failed to create Todo");
    }
  };

  return (
    <div className="mt-4">
      <Button onClick={handleOpen} variant="contained">
        Add ToDo
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <InputForm
            initialValue={{ title: "", completed: false }}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </Box>
      </Modal>
    </div>
  );
}

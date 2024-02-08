import { useMutation } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, IconButton } from "@mui/material";
import { deleteTodo, fetchToDos } from "@/queries/queries";

type DeleteTodoProps = {
  id: string;
};

export default function DeleteTodo({ id }: DeleteTodoProps) {
  const [removeTodo, { loading, client }] = useMutation(deleteTodo);

  const removingTodo = () =>
    removeTodo({
      variables: { id: id },
      update: (cache) => {
        const { allTodos } = cache.readQuery<any>({ query: fetchToDos });
        const updatedTodos = allTodos.filter((todo: any) => todo.id !== id);
        cache.writeQuery({
          query: fetchToDos,
          data: { allTodos: updatedTodos },
        });

        cache.evict({ id: `Todo:${id}` });
        cache.gc();
      },
    });
  const handleClick = async () => {
    try {
      await removingTodo();
    } catch (err) {
      console.log("failed to delete todo");
    }
  };
  return loading ? (
    <CircularProgress size={15} color="inherit" />
  ) : (
    <IconButton aria-label="delete" onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  );
}

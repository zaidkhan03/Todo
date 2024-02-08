import Button from "@mui/material/Button";
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";

export default function TodoGroup({ todoKey, value, router }: any) {
  const renderedTodos = value?.map(
    (item: {
      id: string;
      title: string;
      completed: boolean;
      createdAt: string;
    }) => {
      const day = new Date(item.createdAt).getDate();
      const month = new Date(item.createdAt).getMonth() + 1;
      const year = new Date(item.createdAt).getFullYear();
      return (
        <div
          key={item.id}
          className="flex flex-col justify-center items-center gap-y-2 relative
          cursor-pointer w-48 h-60 rounded-3xl bg-white px-7 pt-7 m-4
          border-slate-400 border-2 transition-all duration-500 ease-out
          hover:shadow-xl hover:scale-105 hover:border-blue-500"
        >
          <div className="absolute right-2 top-2">
            <DeleteTodo id={item.id} />
          </div>
          <div className="mt-2">{item.title}</div>
          {item.completed ? (
            <div className="text-green-500">Completed</div>
          ) : (
            <div className="text-red-500">Incomplete</div>
          )}
          <div>
            {day}-{month}-{year}
          </div>
          <Button
            onClick={() => router.push(`/todo-list/${item.id}`)}
            variant="contained"
          >
            View
          </Button>
          <UpdateTodo
            id={item.id}
            title={item.title}
            completed={item.completed}
          />
        </div>
      );
    }
  );

  return (
    <div className="flex flex-col justify-center">
      <div className="ml-6">{todoKey}</div>
      <div className="flex flex-row">{renderedTodos}</div>
    </div>
  );
}

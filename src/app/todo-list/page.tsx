"use client";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import AddTodo from "@/components/AddTodo";
import { fetchToDos } from "@/queries/queries";
import TodoGroup from "@/components/TodoGroup";

const convertDate = (date: string) => {
  return date.split("-").reverse().join("-");
};
const getGroups = (data: any) => {
  const groups: any = {};
  for (let i = 0; i < data?.length; i++) {
    const day = new Date(data[i].createdAt).getDate();
    const month = new Date(data[i].createdAt).getMonth() + 1;
    const year = new Date(data[i].createdAt).getFullYear();
    const formatedDate = `${day}-${month}-${year}`;
    if (!groups[formatedDate]) {
      groups[formatedDate] = [data[i]];
    } else {
      groups[formatedDate].push(data[i]);
    }
  }

  const keys = Object.keys(groups).sort((a, b) => {
    return (
      (new Date(convertDate(a)) as any) - (new Date(convertDate(b)) as any)
    );
  });

  const result: any = new Map();
  for (const date of keys) {
    result.set(date, groups[date]);
  }

  return result;
};

export default function TodoList() {
  const { data, error, loading } = useQuery(fetchToDos);
  const router = useRouter();

  let groups = getGroups(data?.allTodos);

  const renderedGroups: any = [];
  for (let [key, value] of groups) {
    renderedGroups.push(
      <TodoGroup todoKey={key} value={value} router={router} key={key} />
    );
  }

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="ml-8 flex flex-col gap-y-6 items-center justify-center">
      <AddTodo />
      <div className="flex flex-col gap-y-6 w-screen">{renderedGroups}</div>
    </div>
  );
}

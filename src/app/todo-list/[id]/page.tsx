"use client";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { fetchOneToDo } from "@/queries/queries";

export default function TodoListItem() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(fetchOneToDo, {
    variables: { id },
  });
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="flex flex-col cursor-pointer w-48 h-60 rounded-3xl bg-white p-7">
      <div>ID:{data.Todo.id}</div>
      <div>Title:{data.Todo.title}</div>
      <div>Status:{data.Todo.completed ? "completed" : "incomplete"}</div>
      <div>Date Created:{data.Todo.createdAt}</div>
    </div>
  );
}

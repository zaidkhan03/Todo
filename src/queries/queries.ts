import { gql } from "@apollo/client";

const addTodo = gql`
  mutation CreateTodo(
    $title: String!
    $completed: Boolean!
    $createdAt: Date!
  ) {
    createTodo(title: $title, completed: $completed, createdAt: $createdAt) {
      id
      title
      completed
      createdAt
    }
  }
`;

const deleteTodo = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) {
      id
      title
      completed
      createdAt
    }
  }
`;

const fetchToDos = gql`
  query AllTodos {
    allTodos {
      id
      title
      completed
      createdAt
    }
  }
`;

const updateTask = gql`
  mutation UpdateTodo($id: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const fetchOneToDo = gql`
  query Todo($id: ID!) {
    Todo(id: $id) {
      id
      title
      completed
    }
  }
`;

export { addTodo, deleteTodo, fetchToDos, updateTask, fetchOneToDo };

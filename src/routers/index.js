import { createBrowserRouter, Navigate } from "react-router-dom";
import { Books } from "../components/page/books";

export const router = createBrowserRouter([
  {
    path: "/:bookId",
    element: <Books />,
  },
  {
    path: "/",
    element: <Navigate to="./1" />,
  },
]);

import { createBrowserRouter } from "react-router";

import HomePage from "@/pages/HomePage";
import EditorPage from "@/pages/EditorPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/editor", element: <EditorPage /> }
]);
import { createBrowserRouter } from "react-router";

import HomePage from "@/features/HomePage";
import EditorPage from "@/features/EditorPage";
import VideoPage from "@/features/VideoPage";
import AboutPage from "@/features/AboutPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/editor", element: <EditorPage /> },
  { path: "/video", element: <VideoPage /> },
  { path: "/about", element: <AboutPage /> },
]);
import { createRoot } from "react-dom/client";
import App from "./App";
import { setBaseUrl } from "@workspace/api-client-react";
import { apiBaseUrl } from "@/lib/deployment";
import "./index.css";

if (apiBaseUrl) {
  setBaseUrl(apiBaseUrl);
}

createRoot(document.getElementById("root")!).render(<App />);

import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "bx35wo",
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});

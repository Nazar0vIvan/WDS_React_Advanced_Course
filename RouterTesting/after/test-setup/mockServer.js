import { http } from "msw";
import { setupServer } from "msw/node";

export const mockServer = setupServer();

export function addMockApiRouteHandler(type, path, cb) {
  mockServer.use(
    http[type](new URL(path, import.meta.env.VITE_API_URL).href, cb)
  );
}

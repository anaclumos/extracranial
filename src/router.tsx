import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function createAppRouter() {
  return createRouter({
    defaultPreload: "intent",
    defaultPreloadDelay: 50,
    defaultStructuralSharing: true,
    routeTree,
    scrollRestoration: true,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}

export function getRouter() {
  return createAppRouter();
}

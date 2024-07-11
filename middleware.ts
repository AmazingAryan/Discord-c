import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { authMiddleware } from "@clerk/nextjs/server";


const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/uploadthing",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
  publicRoutes: ["/api/uploadthing"]
});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
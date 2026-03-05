import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("about", "routes/About.tsx"),
  route("wishlist", "routes/Wishlist.tsx"),
  route("login", "routes/Login.tsx"),
] satisfies RouteConfig;
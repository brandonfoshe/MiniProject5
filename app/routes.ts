import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Home.tsx"),
    route("/login", "routes/LoginPage.tsx"), 
    route("/movie/:id", "routes/Movie.tsx"),
    route("/wishlist", "routes/WishlistPage.tsx"),
    route("/CreateUser","routes/CreateUser.tsx")
] satisfies RouteConfig;
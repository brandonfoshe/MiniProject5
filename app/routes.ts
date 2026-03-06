import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/Home.tsx"),
    route("/login", "routes/LoginPage.tsx"),
    route("/movie/:id", "routes/Movie.tsx"),
    route("/CreateUser", "routes/CreateUser.tsx"),

    // Protected routes wrapped in PrivateRoute layout
    layout("routes/PrivateRoute.tsx", [
        route("/wishlist", "routes/WishlistPage.tsx"),
    ]),
] satisfies RouteConfig;
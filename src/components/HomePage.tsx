import type { Route } from "../extra/home";
import { HomeMessage } from "./HomeMessage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mango Movies" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <HomeMessage />;
}

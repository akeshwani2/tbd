import Header from "./components/Header";
import BoardClient from "./components/BoardClient";

export default function Home() {
  return (
    <div className="h-screen flex flex-col px-4 overflow-hidden">
      <Header />
      <div className="flex-1 overflow-hidden">
        <BoardClient />
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function MainLayout() {
  return (
    <div className="min-h-screen  border flex flex-col">
      <Header />
      <main className="flex-1 border border-red-500 ">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

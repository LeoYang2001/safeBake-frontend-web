import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import { COLORS } from "./constants";

function MainLayout() {
  return (
    <div className="min-h-screen   flex flex-col">
      <Header />
      <main
        style={{
          backgroundColor: COLORS.BACKGROUND,
          padding: "20px",
        }}
        className=" flex-1 w-full  flex   "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

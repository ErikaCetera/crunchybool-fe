import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <Navbar />

        <main className="container pt-4">
          <Outlet />
        </main>

      <Footer />
    </>
  );
}

export default Layout;

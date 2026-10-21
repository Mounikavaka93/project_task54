import Footer from "./Footer";
import Navbar from "./Navbar";

export default function SiteFrame({ children }) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

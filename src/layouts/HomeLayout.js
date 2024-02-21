import Footer from "@/components/Footer";
import Navbar from "@/components/HomeNavbar";

export default function HomeLayout(props) {
  return (
    <>
      <Navbar />
      <main className="text-md">{props.children}</main>
      <Footer />
    </>
  );
}

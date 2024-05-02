import Footer from "@/components/Footer";
import Navbar from "@/components/HomeNavbar";

export default function HomeLayout(props) {
  return (
    <div className="bg-white dark:bg-slate-900">
      <Navbar />
      <main className="text-md">{props.children}</main>
      <Footer />
    </div>
  );
}

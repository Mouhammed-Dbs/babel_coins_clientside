import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout(props) {
    return (
      <>
        <Navbar/>
        <main className="text-md">
          {props.children}
        </main>
        <Footer/>
      </>
    )
  }
  
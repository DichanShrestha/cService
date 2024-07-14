import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={className}>
      <Navbar />
      <div className="mt-[56px]">
        <hr className=" border-gray-400 my-4" />

        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Wrapper;

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <HydrationOverlay>
      <div className={className}>
        <Navbar />
        <div className="mt-[56px]">
          <hr className=" border-gray-400 my-4" />
          {children}
        </div>
        <Footer />
      </div>
    </HydrationOverlay>
  );
};

export default Wrapper;

"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/lib/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  // const theme = useSelector((state: any) => state.theme)
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default StoreProvider;

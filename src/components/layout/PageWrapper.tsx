import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PageLayout } from "./PageLayout";
import { Navbar } from "../ui";

/* Renders components present on any page and the contents of current route. */
export const PageWrapper: React.FC = () => {
  const { pathname } = useLocation();
  const canRenderNavbar = pathname !== "/login" && pathname !== "/register";
  React.useEffect(() => {
    console.log("Outlet rendered");
  }, []);
  console.log("PageWrapper rendered");
  return (
    <>
      {/* Navbar */}
      {canRenderNavbar ? <Navbar /> : null}
      {/* Page layout for every page */}
      <PageLayout>
        <Outlet />
        {/* <Login /> */}
      </PageLayout>
    </>
  );
};

// test navbar conditional render

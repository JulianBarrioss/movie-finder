import React from "react";

import { Header } from "../components/Header";
import { TrendingSection } from "../containers/TrendingSection";
import { Categories } from "../containers/Categories";

import { Footer } from "../components/Footer";

const Main = () => {
  return (
    <>
      <Header />
      <TrendingSection />
      <Categories />

      <Footer />
    </>
  );
};

export { Main };

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main } from "../pages/Main";
import { CategoryPage } from "../pages/CategoryPage";
import { SearchPage } from "../pages/SearchPage";
import { TrendingPage } from "../pages/TrendingPage";
import { MovieDetails } from "../pages/MovieDetails";
import { AppContext } from "../context/AppContext";
import { useAppState } from "../hooks/useAppState";

function App() {
  const initialState = useAppState();
  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/category:id" element={<CategoryPage />} />
          <Route path="/search:movie" element={<SearchPage />}/>
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/movie:movie" element={<MovieDetails/>}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

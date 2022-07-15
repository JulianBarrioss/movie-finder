import { useState } from "react";

const useAppState = () => {
  const [categoryState, setCategoryState] = useState("");
  const [searchState, setSearchState] = useState("");
  const [movieState, setMovieState] = useState("");


  return {
    categoryState,
    setCategoryState,
    searchState,
    setSearchState,
    movieState,
    setMovieState,
  };
};

export { useAppState };

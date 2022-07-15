import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { useGetData } from "../hooks/useGetData";
import { AppContext } from "../context/AppContext";
import "../styles/containers/Categories.css";

const Categories = () => {
  const { setCategoryState } = useContext(AppContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    useGetData("/genre/movie/list", setCategories, "genres");
  }, []);

  return (
    <>
      <section id="categoriesPreview" className="categoriesPreview-container">
        <h2 className="categoriesPreview-title">Categories</h2>
        <article className="categoriesPreview-list">
          {categories.map((category, index) => (
            <Link
              to={`/category:${category.id}-${category.name}`}
              key={index}
              className="category-container"
            >
              <div onClick={() => setCategoryState(category)}>
                <h3 id={`id${category.id}`} className="category-title">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </article>
      </section>
    </>
  );
};

export { Categories };

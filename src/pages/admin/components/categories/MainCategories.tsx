import React from "react";
import CreateCategory from "./CreateCategory";
import CategoryTable from "./CategoryTable";

const MainCategories = () => {
  return (
   <div className="m-5 border rounded-lg shadow-lg p-5 flex">
    <CreateCategory/>
    <CategoryTable/>
   </div>
  );
};

export default MainCategories;

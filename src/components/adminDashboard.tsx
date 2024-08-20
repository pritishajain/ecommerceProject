import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from "./error_boundary";
import Loading from "./loading_comp/loading";
import ErrorPage from "./error_page/error_page";

// const wait = (time: number) => {
//   return new Promise(resolve => {
//     setTimeout(resolve, time);
//   })
// }

const HomeScreen= lazy(() => import('../pages/admin/screens/HomeScreen'));
const ProductScreen= lazy(() => import('../pages/admin/screens/ProductScreen'));
const AddProductScreen = lazy(() => import('../pages/admin/screens/AddProductScreen'));
const CategoryScreen = lazy(() => import ('../pages/admin/screens/CategoryScreen'));

const AdminDashboard = () => {

  return (
    <React.Fragment>

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ErrorBoundary> <HomeScreen /> </ErrorBoundary>} >
            <Route path="/products" element={<ErrorBoundary> <ProductScreen /> </ErrorBoundary>} />
            <Route path="/addproduct" element={<ErrorBoundary> <AddProductScreen /> </ErrorBoundary>} />
            <Route path="/category" element={<ErrorBoundary> <CategoryScreen /> </ErrorBoundary>} />
          
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <ToastContainer autoClose={1000} />
    </React.Fragment>
  );
};

export default AdminDashboard;

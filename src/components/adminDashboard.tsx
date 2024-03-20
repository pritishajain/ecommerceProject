import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from "./error_boundary";
import Title from "./title_section/title";
import Loading from "./loading_comp/loading";

// const wait = (time: number) => {
//   return new Promise(resolve => {
//     setTimeout(resolve, time);
//   })
// }

const AdminHome = lazy(() => import('../pages/admin/homePage/Home'));

const AdminDashboard = () => {

  return (
    <React.Fragment>
      <Title />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ErrorBoundary> <AdminHome /> </ErrorBoundary>} />

        </Routes>
      </Suspense>


      <ToastContainer autoClose={1000} />
    </React.Fragment>
  );
};

export default AdminDashboard;

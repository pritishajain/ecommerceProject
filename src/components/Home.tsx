import React, { useEffect, useState } from "react";
import AdminDashboard from "./adminDashboard";
import UserDashboard from "./userDashboard";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parseData = JSON.parse(authData);
      setIsAdmin(parseData.isAdmin);
    }
    // eslint-disable-next-line
  }, []);
  return <>{isAdmin ? <AdminDashboard /> : <UserDashboard />}</>;
};

export default Home;

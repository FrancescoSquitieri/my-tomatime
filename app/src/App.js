import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavbarFront from "./components/Navbar/NavbarFront";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AuthContext from "./store/auth/auth-context";
import client from "./api/client";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const token=authCtx.token;
  // const [t,tt]=useState({});
  // const test=useCallback(async()=>{
  //   try {
  //     const pp = await client.post('/api/todos',{token:token},{
  //         headers: {
  //             Authorization: `Bearer ${token}`
  //         }
  //     });
  //     tt(pp);
  //   } catch(error) {
  //       return console.log(error);
  //   }
  // },[token]);

  // useEffect(()=>{
  //   test();
  // },[test]);
  // console.log(t);
  return (
    <Fragment>
      {isLoggedIn && (
        <Fragment>
          <NavbarFront />
          <div style={{ height: "100px" }} />
        </Fragment>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/">
          <Route
            path="home"
            element={
              isLoggedIn ? <Welcome /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/home" replace />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default App;

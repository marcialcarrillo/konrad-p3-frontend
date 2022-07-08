import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import reportWebVitals from "./reportWebVitals";
import Home from "./components/Home/Home";
import ScrollToTop from "./utils/ScrollToTop";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import AddMoney from "./components/AddMoney/AddMoney";
import MoneyTransfer from "./components/MoneyTransfer/MoneyTransfer";
import PayServices from "./components/PayServices/PayServices";
import LogOut from "./components/LogOut/LogOut";
import AccountHistory from "./components/AccountHistory/AccountHistory";
import PayServicesVerify from "./components/PayServiceVerify/PayServiceVerify";
import Dashboard from "./components/Dashboard/Dashboard";
import TransferResult from "./components/TransferResult/TransferResult";
import TransferVerify from "./components/TransferVerify/TransferVerify";
import Profile from "./components/Profile/Profile";
import "./fonts/KantumruyPro-Regular.ttf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route
              path="log-out"
              element={
                <ProtectedRoute>
                  <LogOut />
                </ProtectedRoute>
              }
            />
            <Route path="account-history" element={<AccountHistory />} />
            <Route
              path="add-money"
              element={
                <ProtectedRoute>
                  <AddMoney />
                </ProtectedRoute>
              }
            />
            <Route
              path="money-transfer"
              element={
                <ProtectedRoute>
                  <MoneyTransfer />
                </ProtectedRoute>
              }
            />
            <Route
              path="pay-services"
              element={
                <ProtectedRoute>
                  <PayServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="pay-services/:service"
              element={
                <ProtectedRoute>
                  <PayServicesVerify />
                </ProtectedRoute>
              }
            />
            <Route
              path="transaction-result"
              element={
                <ProtectedRoute>
                  <TransferResult />
                </ProtectedRoute>
              }
            />
            <Route
              path="transfer-verify"
              element={
                <ProtectedRoute>
                  <TransferVerify />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

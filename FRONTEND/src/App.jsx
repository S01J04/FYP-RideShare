import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import {Home} from "./pages/Home";
import {ErrorPage} from "./pages/ErrorPage";
// import ProtectedRoute from "./components/ProtectedRoute";
import { SearchPage } from "./Pages/SearchPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { RideDetailPage } from "./Pages/RideDetailPage";
import Layout from "./Pages/Layout";
import PublishRidePage from "./Pages/PublishRidePage";
import Chat from "./Pages/Chat";
import RidesSearched from "./Pages/RIdes_Searched";


function App() {
  return (
  
      <Routes>
        {/* Public Routes */}
       
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="/search-ride" element={<SearchPage />} />
        <Route path="/search-ride/:rides" element={<RidesSearched />} />
        <Route path="/ride-detail/:id" element={<RideDetailPage />} />  
        <Route path="/create-ride" element={<PublishRidePage />} />
        <Route path="/chat" element={<Chat />} />
        </ Route>
        {/* <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} /> */}

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />}/>

        {/* Protected Routes */}
        {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} /> */}

        {/* Error Handling */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
  );
}

export default App;

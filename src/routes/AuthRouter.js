import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import Error from '../components/Error'
import Header from '../components/Header'
import ProtectedRoute from './ProtectedRoute'
import UserList from '../pages/app/UserList'
import AddVideo from '../pages/app/AddVideo'
import { ToastContainer } from 'react-toastify';
import VideoList from '../pages/app/VideoList'
function AuthRouter() {
    return (
        <BrowserRouter>
             <ToastContainer />
            <Routes>
                <Route path="/app*" element={
                    <ProtectedRoute>
                        <Header />
                        <Routes>
                            <Route index path="/user-list" element={<UserList />} />
                            <Route path="/add-video" element={<AddVideo />} />
                            <Route path="/video-list" element={<VideoList />} />
                            <Route path="/error" element={<Error />} />
                            <Route path="/app" element={<Navigate replace to="/home" />} />
                        </Routes>
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/error" element={<Error />} />
                <Route path="/*" element={<Navigate replace to="/error" />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
        </BrowserRouter >
    )
}

export default AuthRouter


function About() {
    return (
        <div>Admin About Page......</div>
    )
}
function Home() {
    return (
        <div>Admin Home Page.....</div>
    )
}
function Dashboard() {
    return (
        <div>Admin Dashboard Page.......</div>
    )
}
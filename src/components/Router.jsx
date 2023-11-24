import React from 'react';
import { Route, Routes } from "react-router-dom";
import NavbarBooky from "./navbar/navbar";
import Login from "./login/login";
import Register from "./register/register";
import Profile from "./seller/profile";
import BooksRouter from "./books/booksRouter";
import PdfViewer from './books/pdfviewer';
import Notfound from './notfound';
import Footer from './footer/footer';
import Sellers from './seller/sellers';
import Userbooks from './books/userbooks';
const Router = () => {
  return (
    <div>
         <NavbarBooky />
        <Routes>
              <Route path="/" element={<BooksRouter/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/seller/:id' element={<Profile/>} />
              <Route path='/sellers' element={<Sellers/>} />
              <Route path='/userbooks' element={<Userbooks/>} />
              <Route path='/checkbook/:id' element={<PdfViewer/>} />
              <Route path='/*' element={<Notfound/>} />
        </Routes>
        <Footer/>
    </div>
  )
}

export default Router
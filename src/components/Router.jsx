import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NavbarBooky from "./navbar/navbar";
import Footer from './footer/footer';
import Loading from "../lazy";
const Login =  lazy(() => import("./login/login"));
const Register =  lazy(() => import("./register/register"));
const Profile =  lazy(() => import("./seller/profile"));
const BooksRouter =  lazy(() => import("./books/booksRouter"));
const PdfViewer =  lazy(() => import('./books/pdfviewer'));
const Notfound =  lazy(() => import('./notfound'));
const Sellers =  lazy(() => import('./seller/sellers'));
const Userbooks =  lazy(() => import('./books/userbooks'));

const Router = () => {
  return (
    <div>
         <NavbarBooky />
         <Suspense fallback={<Loading/>}>
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
        </Suspense>
        <Footer/>
    </div>
  )
}

export default Router
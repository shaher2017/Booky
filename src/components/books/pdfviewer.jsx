import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosinstance from '../axiosinstance';


const PdfViewer = () => {
  const param = useParams();

  useEffect(() => {
    axiosinstance
      .get(`/book/getfile/?book_id=${param.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('booky-access-token'),
        },
        withCredentials: true,
      })
      .then((response) => {
        setTimeout(() => {
            window.open(`${process.env.REACT_APP_IMAGE_URL}${response.data.bookpdf}`, '_blank');
        }, 2000);
           
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  return (
        <div style={{display:"flex", justifyContent:"space-around", alignItems:"center",minHeight:"30rem"}}>
      <p style={{ fontSize:"2rem",fontWeight:"bold"}}>
        Openning the File....
      </p>
    </div>
  );
};

export default PdfViewer;


import React from 'react';
import { useParams } from 'react-router-dom';
import ViewProduct from './viewProduct.jsx';
import Comments from './comments.jsx'
import Header from './header.jsx';
import Footer from './footer.jsx';

function Main() {

  return (
    <>
    <Header />
      <ViewProduct  productId={useParams()}/>
      {/* <Comments  productId={useParams()} /> */}
      <Footer/>
    </>
  );
}

export default Main;

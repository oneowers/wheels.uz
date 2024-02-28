
import React from 'react';
import { useParams } from 'react-router-dom';
import ViewProduct from './viewProduct.jsx';
import Comments from './comments.jsx'

function Main() {

  return (
    <>
      <ViewProduct  productId={useParams()}/>
      {/* <Comments  productId={useParams()} /> */}
    </>
  );
}

export default Main;

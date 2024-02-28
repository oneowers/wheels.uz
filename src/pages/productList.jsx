
import ProductGrid from './components/product_grid.jsx';

const App = ({ api, productsCount }) => {
  return (
    <>
        <ProductGrid productsCount={productsCount} api={api}/>
    </>
  );
};

export default App;

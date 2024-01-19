import Header from './header.jsx';
import Footer from './footer.jsx';
import ProductGrid from './components/product_grid.jsx';

const App = ({ api, productsCount }) => {
  return (
    <>
        <Header />
        <ProductGrid productsCount={productsCount} api={api}/>
        <Footer />
    </>
  );
};

export default App;

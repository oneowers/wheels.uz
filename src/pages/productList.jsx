
import CategoryList from './components/category_grid.jsx';

const App = ({ api, productsCount }) => {
  return (
    <>
        <CategoryList productsCount={productsCount} api={api}/>
    </>
  );
};

export default App;

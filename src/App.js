import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import Home from './components/Home';
import ItemsArea from './components/ItemsArea';
import Checkout from './components/Checkout';
import { fetchIngedientsData, gotoPage} from './actions/appActions';


function App() {
  const route = useSelector(state => state.routerReducer).page;
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchIngedientsData());
    dispatch(gotoPage("home"))
  },[])
  

  return (
    <>
      <CssBaseline />
      <Header />
      {
        route === "home"
         ? 
          <Home />
         :
         route === "itemsArea" 
         ?
         <ItemsArea />
         :
         route === "checkout"
         &&
         <Checkout />
      }
     
    </>
  );
}

export default App;

import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Typography';
import { gotoPage } from '../actions/appActions';

function Header() {
  const dispatch = useDispatch();
    return (
        <AppBar position="relative">
        <Toolbar>
          <IconButton onClick={()=>dispatch(gotoPage('home'))}>
             <img src="https://img.icons8.com/color/50/000000/greek-salad.png"/>
          </IconButton>
        
          <Typography variant="h5" color="inherit" noWrap>
             Health Food Store
          </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default Header;

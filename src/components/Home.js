import { useDispatch } from 'react-redux';
import {Typography, Container, Button, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gotoPage } from '../actions/appActions';

const useStyles = makeStyles(() => ({
    root: {
      
      margin: 'auto',
      position: 'relative',
    },
    boxTxt: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        textAlign: 'center',
    },
    cta: {
      width: "60%",
      display: 'block',
      textAlign: 'center',
      fontWeight: 500,
      fontSize: 18,
      padding: 24,
    },
  }));
  

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Box className={classes.boxTxt}>
                <Typography variant="h5" gutterBottom>
                        HOW TO MAKE AN INTERESTING SALAD?
                </Typography>
                <Typography className={classes.cta}>
                    A salad is only as good as its ingredients, and to make a truly great salad you’ve got to use ingredients that are at their best: ripe, seasonal and fresh
                    Choose yore favorite salad ingredients and combine them into healthy and tasty salad.
                </Typography>
                <Button 
                size="large"
                variant="contained"
                color="primary"  
                onClick={()=>dispatch(gotoPage('itemsArea'))}>Go to ingraedients page
            </Button>
            </Box>
            
            
        </Container>
    )
}

export default Home;

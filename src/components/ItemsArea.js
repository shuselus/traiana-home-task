import { useState, useEffect, useMemo, useCallback }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Typography, Container, Button, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Item from './Item';
import { addOrderItem, updateOrderItem, gotoPage } from '../actions/appActions';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      title: {

      },
      divider: {
          width: "100%"
      },
      pbtn: {
          alignSelf: "flex-end",
          margin: theme.spacing(2, 0, 2, 1),
      },
      
    }));


function ItemsArea() {
    const [pBtnDisabled, setPBtnDisabled] = useState(true);
    const ingredients = useSelector(state => state.ingrReducer);
    const orderItems = useSelector(state => state.orderReducer).orderItems;
    const classes = useStyles();  
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(orderItems && orderItems.length > 0){
            //enable "Proceed to Checkout" button
            setPBtnDisabled(false);
        }
    },[orderItems]);
    
    const onAddOrderItem = useCallback((data) => {
        //combine items from the same kind by adding quantity 
        //and update orderItems redux store
            const updateItem = orderItems.find(item => item.name === data.name);
            if(updateItem){
                updateItem.qty += 1;
                dispatch(updateOrderItem(updateItem));
            }else{
                let tempData = {...data}  
                tempData.id = orderItems.length;  
                tempData.qty = 1; 
                dispatch(addOrderItem(tempData));
            }
    },[orderItems]);

    const getEddedItemQuantity = (item) => {
        const addedItem = orderItems.find(added => added.name === item.name);
        return addedItem ? addedItem.qty : 0;
     }
     
    return (  
        <Container maxWidth="lg" className={classes.root}>
            <Typography className={classes.title}>
                Choose the ingredients by clicking on item
            </Typography>
            {
                ingredients && ingredients.length && 
                  ingredients.map((item, idx) => 
                  <Item 
                        key={"item"+idx} 
                        data={item} 
                        image = {`./svgs/${item.name}.svg`} 
                        added = { getEddedItemQuantity(item) }
                        onAddOrderItem={onAddOrderItem}/>)
            }
            <Divider className={classes.divider} />
            <Button 
                className={classes.pbtn}
                variant="contained"
                color="primary" 
                disabled={pBtnDisabled} 
                onClick={(e) => dispatch(gotoPage('checkout'))}> Proceed to Checkout
            </Button>
        </Container>
    )
}

export default ItemsArea

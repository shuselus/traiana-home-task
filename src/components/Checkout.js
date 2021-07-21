import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CheckoutTableRow from './CheckoutTableRow';
import OrderSummary from './OrderSummary';
import OrderDetailsForm from './OrderDetailsForm';
import { makeStyles } from '@material-ui/core/styles';
import AutorenewSharpIcon from '@material-ui/icons/AutorenewSharp';
import { removeOrderItem, updateOrderItem, gotoPage } from '../actions/appActions';

const useStyles = makeStyles((theme) => ({
    root:{
        //backgroundColor: "#f5f5f5"
        backgroundColor:theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
    },
    table: {
        width: "100%",
        minWidth: 400,
    },
    rPanel: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
    },
    rPanelElem: {
        alignSelf: "flex-end",
        margin: theme.spacing(2, 0, 2, 2),
        width: 250,
    },
    btnsCont:{
        display: 'flex',
        width: "100%",
        justifyContent: "flex-end"
    } 
  }));

function CheckOut() {
    const [openOrderSummaryModal, setOrderSummaryModal] = useState(false);
    const [orderBtnDisabled, setOrderBtnDisabled] = useState(true);
    const [customerFormData, setCustomerFormData] = useState(null);
    const [loader, setLoader] = useState(false);
    const orderItems = useSelector(state => state.orderReducer).orderItems;
    const dispatch = useDispatch();
    const classes = useStyles();
    
    useEffect(()=>{
        if(!orderItems.length){
            dispatch(gotoPage("itemsArea"))
        }
    },[orderItems])

    const getTotalPrice = () =>{
        const tprice = orderItems.map(item =>
           item.qty > 1 ? (item.price * item.qty) : item.price
        ).reduce((sum, i) => sum + i, 0);
        return tprice.toFixed(2);
    } 

    const ccyFormat = (num) => {
        return `${num.toFixed(2)}`;
    }

    const priceRow = (qty, unit) => {
        return qty * unit;
    }
    const onRemoveOrderItem = useCallback((e, data) => {
        e.preventDefault();
        //in case of quantity of items is more then 1 
        //remove one each time clicking on delete btn 
        //and update orderItems redux store
        if(data.qty > 1){
           const updateItem = {...data}
           updateItem.qty -=1;
           dispatch(updateOrderItem(updateItem));
        }else{
           dispatch(removeOrderItem(data));
        }
        
    },[orderItems]);
    
    const onOrderHandler = (e) => {
        e.preventDefault();
        const data = {
            customer: customerFormData,
            order:{
                items: orderItems,
                totalPrice: getTotalPrice(),
            }
        }
        sendFakePostRequest(data)
        
    }
    const sendFakePostRequest = (data) => {
        setLoader(true);
        setTimeout(()=>{
            setLoader(false);
            setOrderSummaryModal(true);
        },300)
    }
    const getFormData = (data) => {
        setCustomerFormData(data);
        setOrderBtnDisabled(false)
    }
    if(loader){
        return (
            <Container className={classes.root}>
                <AutorenewSharpIcon />
            </Container>
        )
    }
    return (
        <>
        <Container className={classes.root}>
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Qty.</TableCell>
                            <TableCell>Unit price($)</TableCell>
                            <TableCell>Price($)</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orderItems.map((item) => (
                                <CheckoutTableRow 
                                    key={item.name} 
                                    data={item}
                                    priceRow={ccyFormat(priceRow(item.qty, item.price))}
                                    onRemoveOrderItem={onRemoveOrderItem}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
                
            </TableContainer>
            <Box className={classes.rPanel}>
                <Typography className={classes.rPanelElem}>
                    total price: {getTotalPrice()}
                </Typography>
                <Box className={classes.btnsCont}>
                    <Button 
                        className={classes.rPanelElem}  
                        variant="contained" color="primary" 
                        onClick={() => dispatch(gotoPage("itemsArea"))}>Add more ingredients
                    </Button>
                </Box>
            </Box>
            <OrderDetailsForm getFormData={getFormData}/>
            <Box className={classes.btnsCont}>
                <Button 
                    className={classes.rPanelElem}
                    width = {500}   
                    variant="contained" 
                    color="primary" 
                    disabled={orderBtnDisabled}
                    onClick={(e) => onOrderHandler(e)}>Order
                </Button>
            </Box>
        </Container>
        
        
        {
            openOrderSummaryModal && 
              <OrderSummary data = {orderItems}/>
        }
        
        </>
    );
}

export default CheckOut

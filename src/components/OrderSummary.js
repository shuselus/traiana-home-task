import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button, Typography} from '@material-ui/core'
import { setOrderItems, gotoPage } from '../actions/appActions';
import CheckoutOrderTable from './CheckoutOrderTable'

const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      modal: {
        display: 'flex',
        padding: theme.spacing(5),
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: theme.spacing(1)
      },
      paper: {
        minWidth: 400,
        maxHeight: 700,
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
       
        padding: theme.spacing(2, 4, 3),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      closeBtn: {
        alignSelf: 'center',
        width: "100%",
        marginTop: theme.spacing(2)
      }
    }));

function OrderSummary({data}) {//{orderItems, totalPrice}
    const rootRef = useRef(null);
    const classes = useStyles();  
    const dispatch = useDispatch();  

    const handleClose = () => {
        dispatch(setOrderItems([]));
        dispatch(gotoPage("home"))
    }
    return (
        <Modal
         disableEnforceFocus
         disableAutoFocus
         open      
         className={classes.modal}
         onClose={handleClose}
         closeAfterTransition
        >
         
            <div className={classes.paper} >
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="h6">Delivery is on its way</Typography>

                <CheckoutOrderTable data={data}/>
                <Button 
                    className={classes.closeBtn} 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClose}>
                   Close
               </Button>
            </div>
        </Modal>
  
    );
}

export default OrderSummary

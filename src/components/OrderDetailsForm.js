import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        width: '100%',
        backgroundColor:theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1)
    },
    form:{
      width: '50%',
    },
    textfield: {
        margin: theme.spacing(1),
        width: 240
    },
    textarea: {
        margin: theme.spacing(1),
        width: 500
    }
}));


function OrderDetailsForm({getFormData}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const classes = useStyles();

    useEffect(()=>{
      console.log("OrderDetailsForm>>>>>>>>")
      if(validateEmail(email) && name.length > 0){
        getFormData({name: name, email: email, note: note});
        setEmailError(false);
      }else{
          if(email.length > 0){
              setEmailError(true);
          }
      }
    },[name, email]);

    const onChangeHandler = (e) =>{
        e.preventDefault();
        const value = e.target.value
        switch(e.target.name){
            case "name": 
                setName(value);
                if(value.length > 0){
                   setNameError(false);
                }else{
                   setNameError(true);
                }
            break;
            case "email": 
                setEmail(value);
            break;
            case "note": 
            if(value.length > 0){
               setNote(value);
            }
        break;
        
            default: break;
        }
     }
    
     const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <Box className={classes.root}>
            <form  className={classes.form} noValidate autoComplete="off">
                <TextField 
                    className={classes.textfield}
                    id="chof-name" 
                    name="name"
                    label="Name" 
                    error={nameError}
                    variant="outlined" 
                    value = {name}
                    placeholder="Enter your name"
                    onChange={(e) => onChangeHandler(e)}/>
                <TextField 
                    className={classes.textfield}
                    id="chof-email" 
                    name="email"
                    label="Email"
                    error={emailError}
                    variant="outlined" 
                    value = {email}
                    placeholder="Enter your email address"
                    onChange={(e) => onChangeHandler(e)}/>
                <TextField
                    id="chof-adnote"
                    name="note"
                    className={classes.textarea}
                    placeholder="Enter additional notes"
                    label="Additional Notes"
                    variant="outlined" 
                    value = {note}
                    onChange={(e) => onChangeHandler(e)}
                    multiline
                    />
            </form>
        </Box>
    )
}

export default OrderDetailsForm

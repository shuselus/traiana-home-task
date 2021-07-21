import React,{ useState}  from 'react';
import {Typography, IconButton} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import {List, 
  ListItem, 
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider} from '@material-ui/core';

  import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
      boxSizing: 'border-box',
      width: "100%",
      display: 'flex',
      flexDirection: 'row',
      //padding: theme.spacing(1, 3),
     
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.palette.background.paper,
      cursor: 'pointer',
    },
    elem: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
      width: "50%"
    },
    addBtn: {
      flexGrow: 1,
      justifySelf: "flex-end",
      padding: theme.spacing(0,4)
    },
    img: {
      height: 30,
    },
    divider: {
      width: "100%"
  }
  })); 

function Item({data, image, /*added,*/ onAddOrderItem}) {
  const [added, setAdded] = useState(0)
  const classes = useStyles(); 
  
  const onAddItem = (e) => {
    e.preventDefault();
    data.image = image;
    onAddOrderItem(data);
    setAdded(prev => prev + 1);
  }
    return (
      <>
      <List className={classes.root} onClick={(e) => onAddItem(e)}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
          <img className={classes.img} src={image} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={data.name} secondary={"$"+data.price} />
        {
          added > 0 && 
          <Typography>added {added} {added > 1 ? "items" : "item"}</Typography>
        }
       <IconButton>
         <AddCircleOutlineOutlinedIcon />
      </IconButton>
      </ListItem>  
    </List>
    <Divider className={classes.divider} />
    </>
    )
}


export default React.memo(Item);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.background.paper,
        cursor: 'pointer',
      },
      rowCell: {
          padding: theme.spacing(0.5,1)
      },
      addBtn: {
        justifySelf: "flex-end",
        padding: theme.spacing(0,4)
      },
      img: {
        height: 24,
      },
    })); 
    
function CheckoutTableRow({data, priceRow, onRemoveOrderItem, onAddOrderItem}) {
    const classes = useStyles();
    const ccyFormat = (num) => {
        return `${num.toFixed(2)}`;
    }
    return (
        <TableRow  key={data.name}>
            <TableCell className={classes.rowCell} scope="row">
                <Avatar>
                    <img className={classes.img} src={data.image} />
                </Avatar>
                {data.name}
            </TableCell>
            <TableCell className={classes.rowCell}>{data.qty}</TableCell>
            <TableCell className={classes.rowCell}>{ccyFormat(data.price)}</TableCell>
            <TableCell className={classes.rowCell}>{priceRow}</TableCell>
            <TableCell className={classes.rowCell} align="right">
                <IconButton onClick={(e) => onAddOrderItem(e,data)}>
                   <AddCircleOutlineOutlinedIcon />
                </IconButton>
                <IconButton onClick={(e) => onRemoveOrderItem(e,data)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default React.memo(CheckoutTableRow)

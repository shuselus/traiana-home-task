import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
    table: {
      minWidth: 400,
    },
  }));

const TAX_RATE = 0.17;

function CheckoutOrderTable({data}) {
    const classes = useStyles();
    
    
    const calculateTotalPrice = (items) =>{
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    const invoiceSubtotal = calculateTotalPrice(data);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    const ccyFormat = (num) => {
        return `${num.toFixed(2)}`;
    }

    const priceRow = (qty, unit) => {
        return qty * unit;
    }
    
return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((item) => (
                <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.qty}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{ccyFormat(priceRow(item.qty, item.price))}</TableCell>
                </TableRow>
            ))
          }

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{invoiceSubtotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    );
}
export default CheckoutOrderTable

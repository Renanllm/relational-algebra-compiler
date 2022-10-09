import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const EntityTableView = ({ entity }) => {
  return (
    <TableContainer sx={{ marginTop: 2 }} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="entity resulted table">
        <TableHead>
          <TableRow>
            {Object.keys(entity?.columns).map((column) => (
              <StyledTableCell key={column}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {entity?.records.map((row, index) => (
            <StyledTableRow key={`row-${index}`}>
              {Object.values(row).map((value, innerIndex) => (
                <StyledTableCell
                  key={`column-${innerIndex}-${value}-value`}
                  component="th"
                  scope="row"
                >
                  {value}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

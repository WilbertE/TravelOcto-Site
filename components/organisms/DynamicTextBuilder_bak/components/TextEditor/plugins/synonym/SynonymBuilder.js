import {StyledSynonymBuilder} from "./SynonymBuilder.style";
import {DialogContent, Table, TableCell, TableBody, TableRow, DialogActions} from "@material-ui/core";
import IconButton from "~/components/atoms/iconButton/IconButton";
import TextField from "~/components/atoms/textfield/Textfield";
import Button from "~/components/atoms/button/Button";

const SynonymBuilder = function ({data, ...props}) {
  return (
    <StyledSynonymBuilder id="synonymDialog" title="Synonymen" open={true} disableBackdropClick={true}>
      <DialogContent>
        <div className="tableWrapper">
          <Table>
            <TableBody id="table-body">
              <TableRow id="template" className="table-row">
                <TableCell className="table-cell" size="small">
                  <div className="content"></div>
                  <IconButton className="deleteButton" small icon={["fal", "trash-alt"]} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <form id="synonym-form" className="add-synonym-form">
          <TextField label="Synonym toevoegen" name="synonym" />
          <IconButton type="submit" small square icon={["fal", "arrow-square-right"]} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="text" id="save-synonym">
          Opslaan
        </Button>
      </DialogActions>
    </StyledSynonymBuilder>
  );
};

export default SynonymBuilder;

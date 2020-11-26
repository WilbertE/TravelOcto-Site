const {StyledPageTagsDialog} = require("./PageTagsDialog.style");
import DialogContent from "~/components/atoms/dialog/DialogContent";
import {Grid, ListItem} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import List from "~/components/atoms/list/List";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Api from "~/util/api";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import VariableRow from "~/components/organisms/VariableSelector/VariableRow";
import Button from "~/components/atoms/button/Button";
import TagSelector from "~/components/organisms/TagSelector/TagSelector";

const PageTagsDialog = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [loading, setLoading] = useState(false);
  const [variables, setVariables] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showTagSelectorDialog, setShowTagSelectorDialog] = useState(false);

  const toggleTagSelectorDialog = () => setShowTagSelectorDialog(!showTagSelectorDialog);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  useEffect(() => {
    if (selectedTag) {
      (async () => {
        const response = await api.fetch({
          endpoint: api.endpoints.getVariables,
          urlReplacements: [["tag", selectedTag]],
        });
        if (!response.success) {
          MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
          return;
        }
        setVariables(response.result);
      })();
    }
  }, [selectedTag]);

  const handleTagSelect = (tag, input, customInput) => {
    console.log(tag, input, customInput);
  };

  const insertRow = (variableName, variableValue, variableChainName, key) => {
    return <VariableRow readonly onSelect={props.onSelect} key={key} name={`${variableChainName}.${variableName}`} value={variableValue} />;
  };

  let availableInputs = [...props.page.urlTags];
  availableInputs.push("*");

  return (
    <>
      <StyledPageTagsDialog open={true} title="Beschikbare bronnen">
        <DialogContent bottomMargin>
          <Grid container>
            <Grid item>
              <div className="item-selector">
                <List noPaddingTop>
                  {props.page.urlTags.map((tag, key) => {
                    return (
                      <ListItem key={key} className="list-item" button onClick={() => setSelectedTag(tag)}>
                        <FontAwesomeIcon icon={["fal", "tag"]} className="list-icon" />
                        {tag}
                      </ListItem>
                    );
                  })}
                </List>
                <div className="button-wrapper">
                  <Button variant="outlined" onClick={toggleTagSelectorDialog}>
                    Bron toevoegen
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item className="variable-selector">
              {loading && <LoadingIndicator />}
              {variables && (
                <div className="table-wrapper">
                  <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell className="property">Variabele</TableCell>
                        <TableCell className="type">Type</TableCell>
                        <TableCell>Voorbeeld</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(variables).map((variable, key) => {
                        return insertRow(variable, variables[variable], selectedTag, key);
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </StyledPageTagsDialog>
      {showTagSelectorDialog && <TagSelector input={availableInputs} onTagSelect={handleTagSelect} onClose={toggleTagSelectorDialog} />}
    </>
  );
};

export default PageTagsDialog;

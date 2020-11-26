const {StyledTagsDialog} = require("./TagsDialog.style");
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
import IconButton from "~/components/atoms/iconButton/IconButton";

const TagsDialog = function (props) {
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

  const insertRow = (variableName, variableValue, variableChainName, key) => {
    return <VariableRow readonly onSelect={props.onSelect} key={key} name={`${variableChainName}.${variableName}`} value={variableValue} />;
  };

  const handleSelectListItem = (e, tag) => {
    e.preventDefault();
    const isDeleteButton = (e.target.classList.contains("delete-button") || e.target.closest(".delete-button")) != null;
    if (!isDeleteButton) setSelectedTag(tag.name);
  };

  const handleDeleteTag = (tag) => {
    MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
      title: "Tag verwijderen?",
      content: "Weet je zeker dat je deze tag wilt verwijderen?\n\nDit kan gevolgen hebben als deze tag wordt gebruikt of andere tags er afhankelijk van zijn.",
      confirm: {
        label: "Verwijderen",
        color: "warning",
        onClick: () => props.onTagDelete(tag),
      },
    });
  };

  let availableInputs = [...props.availableTags.map((x) => x.name)];
  availableInputs.push("*");

  return (
    <>
      <StyledTagsDialog open={true} title="Beschikbare bronnen" onClose={props.onClose}>
        <DialogContent bottomMargin>
          <Grid container>
            <Grid item>
              <div className="item-selector">
                <List noPaddingTop>
                  {props.tags.map((tag, key) => {
                    return (
                      <ListItem key={key} className="list-item" button onClick={(e) => handleSelectListItem(e, tag)}>
                        <FontAwesomeIcon icon={["fal", "tag"]} className="list-icon" />
                        {tag.name.split("_").join(" ")}
                        <IconButton className="delete-button" icon={["fal", "trash-alt"]} onClick={() => handleDeleteTag(tag)} />
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
      </StyledTagsDialog>
      {showTagSelectorDialog && (
        <TagSelector input={availableInputs} disabledTags={props.tags} onTagSelect={props.onTagSelect} onClose={toggleTagSelectorDialog} />
      )}
    </>
  );
};

export default TagsDialog;

import {StyledVariableSelector} from "./VariableSelector.style";
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
import VariableRow from "./VariableRow";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import {retrieveJsonProperty} from "~/util/retrieveJsonProperty";

const VariableSelector = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [loading, setLoading] = useState(false);
  const [variables, setVariables] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  if (!props.allowed) throw "Allowed formats needs to be set for variable selector";

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const getTagArrayNode = (json, selector) => {
    if (Array.isArray(json)) json = json[0];
    if (selector.length == 0) return json;
    const nodeName = selector.pop().replace("[]", "");
    json = json[nodeName];
    if (Array.isArray(json)) json = json[0];
    return getTagArrayNode(json, selector);
  };

  useEffect(() => {
    if (selectedTag) {
      var selectedTagGroups = selectedTag.split(".");
      var rawSelectedTag = selectedTagGroups.shift().replace("[]", "");

      (async () => {
        const response = await api.fetch({
          endpoint: api.endpoints.getVariables,
          urlReplacements: [["tag", rawSelectedTag]],
        });
        if (!response.success) {
          MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
          return;
        }

        var apiData = response.result;

        if (selectedTag.indexOf("[]") > -1) apiData = getTagArrayNode(apiData, selectedTagGroups);
        setVariables(apiData);
      })();
    }
  }, [selectedTag]);

  const insertRow = (variableName, variableValue, variableChainName, key) => {
    //Check if value is object otherwise destrucht
    if (!Array.isArray(variableValue) && typeof variableValue === "object") {
      return (
        <React.Fragment key={key}>
          {variableValue &&
            Object.keys(variableValue).map((subVariable, subKey) => {
              return insertRow(subVariable, variableValue[subVariable], variableChainName + "." + variableName, key + "_" + subKey);
            })}
        </React.Fragment>
      );
    } else {
      var name = `${variableChainName}`;
      if (variableName != "[]") name = `${variableChainName}.${variableName}`;
      if (variableName == "[]") name = `${variableChainName}`;

      return (
        <React.Fragment key={key}>
          <VariableRow allowed={props.allowed} onSelect={props.onSelect} name={`${name}`} value={variableValue} />
          {Array.isArray(variableValue) && (
            <VariableRow allowed={props.allowed} onSelect={props.onSelect} name={`${name}.length`} value={variableValue.length} />
          )}
        </React.Fragment>
      );
    }
  };

  return (
    <StyledVariableSelector open={true} onClose={props.onClose} title="Voeg een variabele in">
      <DialogContent bottomMargin>
        <Grid container>
          {props.tags && props.tags.length != 0 && (
            <Grid item className="item-selector">
              <List noPaddingTop>
                {[...props.tags].sort().map((tag, key) => {
                  return (
                    <ListItem key={key} className="list-item" button onClick={() => setSelectedTag(tag)}>
                      <FontAwesomeIcon icon={["fal", "tag"]} className="list-icon" />
                      {tag}
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          )}
          <Grid item className="variable-selector">
            {loading && <LoadingIndicator />}
            {!variables && (!props.tags || props.tags.length == 0) && (
              <div className="no-variables">Op dit niveau op de pagina bevinden zich geen beschikbare tags</div>
            )}
            {variables && props.tags && variables.length != 0 && props.tags.length != 0 && (
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
                    {Array.isArray(variables) && insertRow("[]", variables, selectedTag, 0)}
                    {!Array.isArray(variables) &&
                      Object.keys(variables).map((variable, key) => {
                        return insertRow(variable, variables[variable], selectedTag, key);
                      })}
                  </TableBody>
                </Table>
              </div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </StyledVariableSelector>
  );
};

export default VariableSelector;

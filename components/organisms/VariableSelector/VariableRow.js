import {TableCell, TableRow} from "@material-ui/core";
import {StyledVariableRow} from "./VariableRow.style";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";

const VariableRow = function ({value, allowed, readonly, ...props}) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const type = Array.isArray(value) ? "array" : typeof value;

  if (type == "array") value = "[" + JSON.stringify(value[0], null, 4) + ",\n{...}]";
  if (type == "object") value = JSON.stringify(value, null, 4);

  const handleSelect = () => {
    if (readonly) return;

    if (!allowed.includes(type)) {
      var allowedItems = allowed;
      if (allowed.length > 1) {
        const lastItem = allowed.pop();
        allowedItems = allowed.join("', '") + " en '" + lastItem;
      }
      MessageboxStoreManager.AddMessage(messageboxStateAtom, {
        title: "Oops",
        content: `Alleen variabelen van type '${allowedItems}' zijn toegestaan`,
      });
      return;
    }
    props.onSelect(props.name);
  };

  let className = allowed && !allowed.includes(type) ? "unselectable" : "";
  if (readonly) className += " readonly";

  return (
    <StyledVariableRow onClick={handleSelect} className={className}>
      <TableCell className="name">{props.name}</TableCell>
      <TableCell className="type">{type}</TableCell>
      <TableCell className="value">{value}</TableCell>
    </StyledVariableRow>
  );
};

export default VariableRow;

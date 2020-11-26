import {Grid} from "@material-ui/core";
import ComponentPreviewFrame from "~/pages_shadow/cms/preview/ComponentPreviewFrame";
import DialogContent from "../atoms/dialog/DialogContent";
import Configurable from "./Configurable";

const ConfigurableFrame = function (props) {
  return (
    <DialogContent>
      <Grid container spacing={2} className="frame-grid">
        {(props.preview == null || props.preview) && (
          <Grid item xs={5} className="frame-preview">
            <ComponentPreviewFrame component={props.component} data={props.data} />
          </Grid>
        )}
        <Grid item xs={props.preview == null || props.preview ? 7 : 12} className="frame-content">
          {props.children}
        </Grid>
      </Grid>
    </DialogContent>
  );
};

export default ConfigurableFrame;

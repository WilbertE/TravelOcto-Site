import {Grid} from "@material-ui/core";

const ContainerConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          Hallo!
        </Grid>
      </Grid>
    </div>
  );
};

export default ContainerConfigurator;

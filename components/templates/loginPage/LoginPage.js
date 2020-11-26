import {Hidden} from "@material-ui/core";
import StyledLoginPage from "./LoginPage.style";
import AuthenticationForm from "~/components/organisms/AuthenticationForm/AuthenticationForm";

export default function LoginPage(props) {


  return (
    <StyledLoginPage>
      <Hidden smDown>
        <img className="logo" src={require("~/assets/images/logo-full.svg").default} alt="ScoutingHawk.com" />
      </Hidden>
      <Hidden mdUp>
        <img className="logo" src={require("~/assets/images/logo.svg").default} alt="ScoutingHawk.com" />
      </Hidden>
      <AuthenticationForm />
    </StyledLoginPage>
  );
}

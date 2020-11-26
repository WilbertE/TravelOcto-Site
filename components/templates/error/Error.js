import {StyledErrorTemplate} from "./Error.style";
import {Hidden} from "@material-ui/core";
import Title from "~/components/atoms/title/Title";
import Text from "~/components/atoms/text/Text";
import Container from "~/components/atoms/container/Container";

export default function ErrorTemplate({title = "Oops", content = "Er is een fout opgetreden"}) {
  return (
    <StyledErrorTemplate>
      <Container>
        <a href="/" title="TravelOcto | Alles voor je volgende reis">
          <Hidden smDown>
            <img className="logo" src={require("~/assets/images/logo-full.svg").default} alt="ScoutingHawk.com" />
          </Hidden>
          <Hidden mdUp>
            <img className="logo" src={require("~/assets/images/logo.svg").default} alt="ScoutingHawk.com" />
          </Hidden>
        </a>
        <Title variant="h2" component="h1" center>
          {title}
        </Title>

        <Text component="p" className="content" center>
          {content}
          <br />
          <a href="/" title="TravelOcto | Alles voor je volgende reis">
            Maar we kunnen je vast verder helpen!
          </a>
        </Text>
      </Container>
    </StyledErrorTemplate>
  );
}

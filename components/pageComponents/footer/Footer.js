import {Grid} from "@material-ui/core";
import Container from "~/components/atoms/container/Container";
import IconButton from "~/components/atoms/iconButton/IconButton";
import Title from "~/components/atoms/title/Title";
import {StyledFooter} from "./Footer.style";

const Footer = function (props) {
  return (
    <StyledFooter>
      <Container className="footer-container">
        <Grid container spacing={4}>
          <Grid item xs={6} md={3}>
            <div>
              <img className="logo" src={require("~/assets/images/logo-full.svg").default} alt="TravelOcto.com" />
            </div>
            Volg ons op social media
            <div>
              <IconButton
                component="a"
                href="https://www.facebook.com/travelocto"
                target="_blank"
                className="social-button"
                square
                icon={["fab", "facebook-f"]}
              />
              <IconButton
                component="a"
                href="https://www.instagram.com/travelocto/"
                target="_blank"
                className="social-button"
                square
                icon={["fab", "instagram"]}
              />
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <Title className="footer-title" component="h6" variant="h5">
              Populair
            </Title>
            <ul className="footer-list">
              <li>
                <a href="/continent/azie">Azië</a>
              </li>
              <li>
                <a href="/continent/afrika">Afrika</a>
              </li>
              <li>
                <a href="/continent/europa">Europa</a>
              </li>
              <li>
                <a href="/continent/oceanie">Oceanië</a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} md={3}>
            <Title className="footer-title" component="h6" variant="h5">
              Laatste artikelen
            </Title>
            <ul className="footer-list">{/* <li>
                <a href="#">Vakantiebestemming in Coronatijden</a>
              </li> */}</ul>
          </Grid>
          <Grid item xs={6} md={3}>
            <Title className="footer-title" component="h6" variant="h5">
              Over ons
            </Title>
            <ul className="footer-list">
              <li>Heigank 114</li>
              <li>6373 KV</li>
              <li>Landgraaf</li>
              <li>Nederland</li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};

export default Footer;

import {Grid} from "@material-ui/core";
import Container from "~/components/atoms/container/Container";
import IconButton from "~/components/atoms/iconButton/IconButton";
import Title from "~/components/atoms/title/Title";
import {StyledFooter} from "./Footer.style";

const Footer = function ({data, ...props}) {
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
          <Grid item xs={6} md={2}>
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
          <Grid item xs={6} md={4}>
            <Title className="footer-title" component="h6" variant="h5">
              Laatste artikelen
            </Title>
            <ul className="footer-list">
              {data.blogs &&
                data.blogs.map((blog, key) => {
                  return (
                    <li key={key}>
                      <a href={"/blog" + blog.url}>{blog.name}</a>
                    </li>
                  );
                })}
            </ul>
          </Grid>
          <Grid item xs={6} md={3}>
            <Title className="footer-title" component="h6" variant="h5">
              Over ons
            </Title>
            <ul className="footer-list">
              <li>Heigank 144</li>
              <li>6373 KV</li>
              <li>Landgraaf</li>
              <li>Nederland</li>
            </ul>
          </Grid>
        </Grid>
      </Container>

      <script
        dangerouslySetInnerHTML={{
          __html:
            "var _TradeTrackerTagOptions = {t: 'a',s: '370553',chk: '92548de6aaf982a9fcae4b127efda7e7',overrideOptions: {}};(function() {var tt = document.createElement('script'), s = document.getElementsByTagName('script')[0]; tt.setAttribute('type', 'text/javascript'); tt.setAttribute('src', (document.location.protocol == 'https:' ? 'https' : 'http') + '://tm.tradetracker.net/tag?t=' + _TradeTrackerTagOptions.t + '&amp;s=' + _TradeTrackerTagOptions.s + '&amp;chk=' + _TradeTrackerTagOptions.chk); s.parentNode.insertBefore(tt, s);})();",
        }}
      />
    </StyledFooter>
  );
};

export default Footer;

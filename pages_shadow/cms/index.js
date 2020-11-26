import Head from "~/components/atoms/head/Head";
import LoginPage from "~/components/templates/loginPage/LoginPage";
import nextCookie from "next-cookies";
import isAuthenticated from "~/Authentication/isAuthenticated";

const Page = () => {
  return (
    <>
      <Head robots="noindex,nofollow" />
      <LoginPage />
    </>
  );
};

Page.getInitialProps = async (ctx) => {
  let {token} = nextCookie(ctx);
  token = isAuthenticated(token);
  if (token) {
    ctx.res.writeHead(302, {Location: "/cms/dashboard"});
    ctx.res.end();
  }
  return {};
};

export default Page;

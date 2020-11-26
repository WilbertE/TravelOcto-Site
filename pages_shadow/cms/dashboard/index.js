import Head from "~/components/atoms/head/Head";
import WithAuthentication from "~/Authentication/withAuthentication";
import CmsPage from "~/components/templates/cmsPage/CmsPage";
import StyledDashboard from "./index.style";
import Title from "~/components/atoms/title/Title";

const Dashboard = function () {
  return (
    <>
      <Head title="Dashboard - TravelOcto" />
      <CmsPage title="Dashboard">
        <StyledDashboard>
          <Title component="h1" variant="h1">
            Welkom
          </Title>
        </StyledDashboard>
      </CmsPage>
    </>
  );
};

export default WithAuthentication(Dashboard);

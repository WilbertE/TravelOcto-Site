import {ListItem} from "@material-ui/core";
import {PageContext} from "../context/pageContext";
import {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StyledListContainer} from "./PageList.style";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import List from "~/components/atoms/list/List";
import {useRouter} from "next/router";

const PageList = function (props) {
  const {store, fetchStore, loading} = useContext(PageContext);
  const router = useRouter();

  const handleListClick = (page) => {
    router.push("/cms/page/" + page.id);
  };

  return (
    <StyledListContainer>
      {loading && <LoadingIndicator />}
      <List>
        {store.map((page, key) => {
          return (
            <ListItem onClick={() => handleListClick(page)} className="list-item" button id={page.id} key={key}>
              <div className="list-item-start">
                <FontAwesomeIcon className="list-icon" icon={["fal", "file"]} />
                {page.url}
              </div>
              <div className="list-item-end">{page.name}</div>
            </ListItem>
          );
        })}
      </List>
    </StyledListContainer>
  );
};

export default PageList;

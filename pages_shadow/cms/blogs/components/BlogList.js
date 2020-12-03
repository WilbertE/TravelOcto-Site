import {ListItem} from "@material-ui/core";
import {BlogContext} from "../context/blogContext";
import {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StyledListContainer} from "./BlogList.style";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import List from "~/components/atoms/list/List";
import {useRouter} from "next/router";

const BlogList = function (props) {
  const {store, fetchStore, loading} = useContext(BlogContext);
  const router = useRouter();

  const handleListClick = (page) => {
    router.push("/cms/blog/" + page.id);
  };

  return (
    <StyledListContainer>
      {loading && <LoadingIndicator />}
      <List>
        {store.map((blog, key) => {
          return (
            <ListItem onClick={() => handleListClick(blog)} className="list-item" button id={blog.id} key={key}>
              <div className="list-item-start">
                <FontAwesomeIcon className="list-icon" icon={["fal", "file-alt"]} />
                {blog.name}
              </div>
              <div className="list-item-end">{blog.url}</div>
            </ListItem>
          );
        })}
      </List>
    </StyledListContainer>
  );
};

export default BlogList;

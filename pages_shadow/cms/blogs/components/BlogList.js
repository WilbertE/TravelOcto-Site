import {ListItem} from "@material-ui/core";
import {BlogContext} from "../context/blogContext";
import {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StyledListContainer} from "./BlogList.style";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import List from "~/components/atoms/list/List";
import {useRouter} from "next/router";
import IconButton from "~/components/atoms/iconButton/IconButton";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";
import Api from "~/util/api";

const BlogList = function (props) {
  const {store, fetchStore, loading, setLoading} = useContext(BlogContext);
  const messageboxStateAtom = useRecoilState(messageboxState);
  const router = useRouter();

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const handleListClick = (e, page) => {
    if (!e.target.classList.contains("list-options") && e.target.closest(".list-options") == null) {
      router.push("/cms/blog/" + page.id);
    }
  };

  const handleDeleteBlog = (key) => {
    MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
      title: "Blog verwijderen?",
      content: "Weet je zeker dat je dit blog wilt verwijderen?",
      confirm: {
        onClick: () => {
          handleDeleteBlogConfirmed(key);
        },
        label: "Verwijderen",
        color: "warning",
      },
    });
  };

  const handleDeleteBlogConfirmed = async (key) => {
    const response = await api.fetch({
      endpoint: api.endpoints.deleteBlog,
      urlReplacements: [["blogId", store[key].id]],
    });
    if (response.success) fetchStore(Date.now());
    if (!response.success) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
  };

  return (
    <StyledListContainer>
      {loading && <LoadingIndicator />}
      <List>
        {store.map((blog, key) => {
          return (
            <ListItem onClick={(e) => handleListClick(e, blog)} className="list-item" button id={blog.id} key={key}>
              <div className="list-item-start">
                <FontAwesomeIcon className="list-icon" icon={["fal", "file-alt"]} />
                {blog.name}
              </div>
              <div className="list-item-end">{blog.url}</div>
              <div className="list-options">
                <IconButton
                  onClick={() => {
                    handleDeleteBlog(key);
                  }}
                  icon={["fal", "trash-alt"]}
                />
              </div>
            </ListItem>
          );
        })}
      </List>
    </StyledListContainer>
  );
};

export default BlogList;

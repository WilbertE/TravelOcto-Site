import {ListItem} from "@material-ui/core";
import {PageContext} from "../context/pageContext";
import {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StyledListContainer} from "./PageList.style";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import List from "~/components/atoms/list/List";
import {useRouter} from "next/router";
import IconButton from "~/components/atoms/iconButton/IconButton";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";
import Api from "~/util/api";

const PageList = function (props) {
  const {store, fetchStore, loading, setLoading} = useContext(PageContext);
  const messageboxStateAtom = useRecoilState(messageboxState);
  const router = useRouter();

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const handleListClick = (e, page) => {
    if (!e.target.classList.contains("list-options") && e.target.closest(".list-options") == null) {
      router.push("/cms/page/" + page.id);
    }
  };

  const handleDeletePage = (key) => {
    MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
      title: "Pagina verwijderen?",
      content: "Weet je zeker dat je deze pagina wilt verwijderen?",
      confirm: {
        onClick: () => {
          handleDeletePageConfirmed(key);
        },
        label: "Verwijderen",
        color: "warning",
      },
    });
  };

  const handleDeletePageConfirmed = async (key) => {
    const response = await api.fetch({
      endpoint: api.endpoints.deletePage,
      urlReplacements: [["pageId", store[key].id]],
    });
    if (response.success) fetchStore(Date.now());
    if (!response.success) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
  };

  return (
    <StyledListContainer>
      {loading && <LoadingIndicator />}
      <List>
        {store.map((page, key) => {
          return (
            <ListItem onClick={(e) => handleListClick(e, page)} className="list-item" button id={page.id} key={key}>
              <div className="list-item-start">
                <FontAwesomeIcon className="list-icon" icon={["fal", "file"]} />
                {page.name}
              </div>
              <div className="list-item-end">{page.url}</div>
              <div className="list-options">
                <IconButton
                  onClick={() => {
                    handleDeletePage(key);
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

export default PageList;

import {useState, useContext, useEffect} from "react";
import {PageContext} from "./pageContext";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import Api from "~/util/api";
import {useRecoilState} from "recoil";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";

const PageProvider = function (props) {
  const [pagesStore, setPagesStore] = useState([]);
  const [fetchStore, setFetchStore] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const messageboxStateAtom = useRecoilState(messageboxState);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  useEffect(() => {
    loadPages();
  }, [fetchStore]);

  const loadPages = async () => {
    const response = await api.fetch({endpoint: api.endpoints.getPages});
    if (!response.success) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
    if (response.success) setPagesStore(response.result);
  };

  return (
    <PageContext.Provider value={{store: pagesStore, fetchStore: setFetchStore, loading: loading, setLoading: setLoading}}>
      {props.children}
    </PageContext.Provider>
  );
};

export default PageProvider;

import {useState, useContext, useEffect} from "react";
import {BlogContext} from "./blogContext";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import Api from "~/util/api";
import {useRecoilState} from "recoil";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";

const BlogProvider = function (props) {
  const [blogsStore, setBlogsStore] = useState([]);
  const [fetchStore, setFetchStore] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const messageboxStateAtom = useRecoilState(messageboxState);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  useEffect(() => {
    loadBlogs();
  }, [fetchStore]);

  const loadBlogs = async () => {
    const response = await api.fetch({
      endpoint: api.endpoints.getBlogs,
    });
    if (!response.success) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
    if (response.success) setBlogsStore(response.result);
  };

  return (
    <BlogContext.Provider value={{store: blogsStore, fetchStore: setFetchStore, loading: loading, setLoading: setLoading}}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;

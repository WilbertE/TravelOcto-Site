import TextField from "~/components/atoms/textfield/Textfield";
import Button from "~/components/atoms/button/Button";
import {useContext} from "react";
import cookie from "js-cookie";
import Router from "next/router";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import Api from "~/util/api";
import {useState} from "react";
import useForm from "~/util/form";
import {useRecoilState} from "recoil";


export default function AuthenticationForm(props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [loading, setLoading] = useState(false);
  const [formData, setFormValue] = useForm({emailaddress: "", password: ""});

  //Api call
  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  //Button functionality
  const handleLogin = async (e) => {
    e.preventDefault();
    var response = await api.fetch({
      endpoint: api.endpoints.administratorLogin,
      body: formData,
    });
    if (response != null && response.success == false) {
      MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
    }
    if (response != null && response.success == true) {
      cookie.set("token", response.token.token, {expires: 1});
      cookie.set("refreshToken", response.token.refreshToken, {expires: 30});
      window.localStorage.setItem("loginStatus", true);
      Router.push("/cms/dashboard");
    }
  };

  //Form
  return (
    <form onSubmit={handleLogin}>
      <TextField label="E-mailadres" name="emailaddress" value={formData.emailaddress} onChange={setFormValue} />
      <TextField type="password" label="Wachtwoord" name="password" value={formData.password} onChange={setFormValue} />
      <Button type="submit" loading={loading}>
        Inloggen
      </Button>
    </form>
  );
}

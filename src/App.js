import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Page from "./page";
import { getUserCurrent } from "./redux/action";

function App() {
  const dispatch = useDispatch();
  const getUser = async () => {
    const email = JSON.parse(localStorage.getItem("emailUser"));
    if (email) {
      // const user = await RestClient.post("http://localhost:5555/userCurrent", {});
      // setUsers(user.data);
      dispatch(getUserCurrent({ requestData: { email } }));
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getUser();
  }, []);

  return (
    <div className="App">
      <Page />
    </div>
  );
}

export default App;

import { AuthContextProvider } from "./context/AuthContext";
import axios from "axios";
import PageRouter from "./Router";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <AuthContextProvider>
      <PageRouter />
    </AuthContextProvider>
  );
}

export default App;

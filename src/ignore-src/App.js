import Homepage from "./components/Homepage";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
// import { useGlobalContext } from "./context";

const App = () => {
  // const data = useContext(AppContext);
  // const data = useGlobalContext();
  // console.log(data);

  return (
    <>
      <Homepage />
      <Sidebar />
      <Modal />
    </>
  );
};

export default App;

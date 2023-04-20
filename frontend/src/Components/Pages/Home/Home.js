import { useUserAuth } from "../../Auth/Context/Context";

const Home = () => {
  const {logOut} = useUserAuth()
  return <button onClick={()=>{logOut()}}>Signout</button>;
};

export default Home;

import useUserAuth from "../../Auth/Hooks/useUserAuth";

const Home = () => {
  const {logOut} = useUserAuth()
  return <button onClick={()=>{logOut()}}>Signout</button>;
};

export default Home;

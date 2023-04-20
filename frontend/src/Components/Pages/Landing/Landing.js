import { useUserAuth } from "../../Auth/Context/Context";

const Landing = () => {
  const {user} = useUserAuth()
  return <button onClick={()=>{console.log(user)}}>User</button>;
};

export default Landing;

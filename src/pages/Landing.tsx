import React, {useEffect} from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Loader from '../components/Loader'


const Landing = () => {
  const [isSignup, setIsSignup] = React.useState<boolean>(false);
  const [loading,setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 2000)
  }, [])

  return(
    <>
    {loading?<Loader />:
    <div className="flex w-full h-screen">
      <div className="w-1/2 max-w-xs mx-auto relative md:flex">
        <div className="absolute inset-0 m-auto" style={{height: '300px'}}>
          {isSignup && <Signup renderLogin={() => setIsSignup(false)} /> || <Login renderSignup={() => setIsSignup(true)} />}
        </div>
      </div>
      <div className="hidden md:w-1/2 md:bg-yellow-300 md:flex " />
    </div>}
    </>
  )
}
export default Landing;

import { useAccount } from "wagmi"
import { Customconnectbutton } from "../components/customconnectbutton"
import { useEffect } from "react"
import {useNavigate } from "react-router-dom"
const Welcome = () => {
    let walletAddress = useAccount().address
    const navigate = useNavigate()
    useEffect(()=>{
        if(walletAddress){
            console.log(true)
            console.log(walletAddress)
            navigate('/home')
        }
    },[walletAddress])
  return (
    <div className="bg-black h-screen w-full p-8">
      <Customconnectbutton></Customconnectbutton>
    </div>
  )
}

export default Welcome

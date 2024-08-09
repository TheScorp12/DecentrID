import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit";
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
    <div className="flex flex-col items-center justify-center h-screen bg-[#121212]">
      <h1 className="text-9xl font-bold text-white font-ClashGrotesk tracking-widest" >
        Welcome
      </h1>
      <span className="text-2xl mb-8 text-[#bfb8e5]"> Connect your Wallet to get Started!</span>
      <div>
        <ConnectButton.Custom>
          {({ account, openAccountModal, openConnectModal, openChainModal, mounted }) => {
            // Render nothing if the button is not mounted
            if (!mounted) {
              return null;
            }

            if (!account) {
              return (
                <button
                  onClick={openConnectModal}
                  className="bg-[#6b65c2] text-white py-3 px-6 rounded-lg text-lg hover:bg-[#6b65c2] transition-colors"
                >
                  Connect Wallet
                </button>
              );
            } else {
              return (
                <button
                  onClick={openAccountModal}
                  className="bg-[#6b65c2] text-white py-3 px-6 rounded-lg text-lg hover:bg-[#5953a1] transition-colors"
                >
                  Wallet Connected
                </button>
              );
            }
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};

export default Welcome;

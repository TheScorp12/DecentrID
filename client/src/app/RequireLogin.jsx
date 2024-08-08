import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { useEffect } from "react";

const RequireAuth = () => {
    const walletAddress = useAccount().address;
    const location = useLocation();
    let userchain = 0;
    console.log(walletAddress);
    const { chains, switchChain } = useSwitchChain();
    userchain = useAccount().chainId;
    useEffect(() => {
    if(walletAddress&&(userchain!=80001))
    {
      switchChain({chainId:80001})
    }
  },[userchain])

  return walletAddress ? (
    <Outlet />
  ) : (
    <Navigate to="/welcome" state={{ from: location }} replace />
  );
};
export default RequireAuth;
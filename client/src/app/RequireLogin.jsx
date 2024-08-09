import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { useEffect } from "react";

const RequireAuth = () => {
    const walletAddress = useAccount().address;
    const location = useLocation();
    let userchain = 0;
    const { chains, switchChain } = useSwitchChain();
    userchain = useAccount().chainId;
    useEffect(() => {
    if(walletAddress&&(userchain!==80002))
    {
      switchChain({chainId:80002})
    }
  },[userchain])

  return walletAddress ? (
    <Outlet />
  ) : (
    <Navigate to="/welcome" state={{ from: location }} replace />
  );
};
export default RequireAuth;
import React from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { Spin, ConfigProvider } from "antd";
import ContractAbi from '../../Contractcalls/Abi/contractabi.json'
import { useEffect } from 'react'
import { Customconnectbutton } from '../../components/customconnectbutton'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()
    let {data, isError, error, isSuccess, isPending, status} = useReadContract({
        address: process.env.REACT_APP_ContractAddress,
        abi: ContractAbi.abi,
        functionName:'getIdentityByAddress',
        args:[useAccount().address]
    })
useEffect(()=>{
    if(isError){
        if(error.cause.data.args[0] === 'Identity does not exist'){
            navigate('/signup')
        }
    }
    else if(isSuccess){
        console.log(data)
    }
},[isError, isPending, isSuccess,data, status])

  return (
    <div className='w-screen h-screen flex justify-center bg-[#1b1a21]'>
        {isSuccess? 
      <Customconnectbutton></Customconnectbutton> : 
      <ConfigProvider
  theme={{
    token: {
      colorPrimary: '#6b65c2'
    },
  }}
>
      <Spin className='self-center justify-center' size='large'/> </ConfigProvider>}
    </div>
  )
}
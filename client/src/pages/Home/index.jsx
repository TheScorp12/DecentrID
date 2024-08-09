import React from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import ContractAbi from '../../Contractcalls/Abi/contractabi.json'
import { useEffect } from 'react'
import { Customconnectbutton } from '../../components/customconnectbutton'

export default function Home() {
    console.log(process.env.REACT_APP_ContractAddress)
    let {data, isError, error, isSuccess, isPending, status} = useReadContract({
        address: process.env.REACT_APP_ContractAddress,
        abi: ContractAbi.abi,
        functionName:'getIdentityByAddress',
        args:[useAccount().address]
    })
    // let {data: result, isSuccess: isWriteSuccess} = useWriteContract({
    //     address: process.env.REACT_APP_ContractAddress,
    //     abi: ContractAbi,
    //     functionName:'registerIdentity',
    //     args:["Mohammed Aasim", "Choudhry", "Scorp_12", "https://cdn-icons-png.flaticon.com/512/9203/9203764.png", false]
    // })
useEffect(()=>{
    console.log('error',error)
    console.log("iseroor",isError)
    console.log("data",data)
    console.log("isSuccess",isSuccess)
    console.log("isPending", isPending)
    console.log(status)
},[isError, isPending, isSuccess,data, status])

// useEffect(()=>{
//     console.log("write data",result)
//     console.log("Write success",isWriteSuccess)
// },[result, isWriteSuccess])
  return (
    <div className=''>
      <Customconnectbutton></Customconnectbutton>
    </div>
  )
}


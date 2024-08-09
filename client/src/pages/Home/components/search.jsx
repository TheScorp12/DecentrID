import { useState, useEffect } from "react"
import React from 'react'
import { Input, message } from "antd";
import { readContract} from "wagmi/actions";
import { polygonAmoy } from "wagmi/chains";
import ContractAbi from '../../../Contractcalls/Abi/contractabi.json'
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const Search = () => {
    const {Search} = Input
    const [isSearching, setIsSearching] = useState(false);
    const config = getDefaultConfig({
        appName: 'RainbowKit demo',
        projectId: 'YOUR_PROJECT_ID',
        chains: [
          polygonAmoy,
        ],
      });

    useEffect(()=>{

    },[isSearching])

    const onSearch = async (value) =>{
        if(value.startsWith('0x')){
            setIsSearching(true)
            try{
                let result = await readContract(config, {
                    address: process.env.REACT_APP_ContractAddress,
                    abi: ContractAbi.abi,
                    functionName:'getIdentityByAddress',
                    args:[value],
                    chainId: polygonAmoy.id
                })
                console.log(result)
        }
            catch(error){
                message.error(error)
            }
        }
        else{
            let {data, isError, error, isSuccess, isPending, status} = readContract({
                address: process.env.REACT_APP_ContractAddress,
                abi: ContractAbi.abi,
                functionName:'getIdentityByAddress',
                args:[value]
            })
            setIsSearching(true)
        }
    }
    
  return (
    <div>
        <Search className='mt-20 mx-4' placeholder="Search Address or Username" onSearch={onSearch} style={{width:'300px', height:'100px'}}></Search>
    </div>
  )
}

export default Search

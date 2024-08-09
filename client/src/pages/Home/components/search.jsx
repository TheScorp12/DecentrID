import { useState, useEffect } from "react"
import React from 'react'
import { Input, message } from "antd";
import { readContract} from "wagmi/actions";
import { polygonAmoy } from "wagmi/chains";
import ContractAbi from '../../../Contractcalls/Abi/contractabi.json'
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import UserCard from "./usercard";

const Search = () => {
    const {Search} = Input
    const [isSearching, setIsSearching] = useState(false);
    const [searchData, setSearchData] = useState()
    const config = getDefaultConfig({
        appName: 'RainbowKit demo',
        projectId: 'YOUR_PROJECT_ID',
        chains: [
          polygonAmoy,
        ],
      });

    const onSearch = async (value) =>{
        setSearchData()
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
                setSearchData(result)
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
    <div className="flex flex-col gap-4">
        <Search className='mt-20 mx-4' placeholder="Search Address or Username" onSearch={onSearch} style={{width:'300px', height:'100px'}}></Search>
        {!searchData?<div className=""></div>:<UserCard user={searchData}></UserCard>}
    </div>
  )
}

export default Search

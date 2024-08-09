import { useState, useEffect } from "react"
import React from 'react'
import { Input, message } from "antd";
import { readContract} from "wagmi/actions";
import { polygonAmoy } from "wagmi/chains";
import ContractAbi from '../../../Contractcalls/Abi/contractabi.json'
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { useReadContract, useAccount } from "wagmi";

const Contacts = () => {
    const [contacts, setContacts] = useState()
    const [contactDetails, setContactDetails] = useState()

    const config = getDefaultConfig({
        appName: 'RainbowKit demo',
        projectId: 'YOUR_PROJECT_ID',
        chains: [
          polygonAmoy,
        ],
      });
      let {data, isError, error, isSuccess, isPending, status} = useReadContract({
        address: process.env.REACT_APP_ContractAddress,
        abi: ContractAbi.abi,
        functionName:'getIdentityByAddress',
        args:[useAccount().address]
    })
    useEffect(() =>{
        if(isSuccess)
        {
            setContacts(data[5]);
            getContactsdata();
        }
    },[isSuccess])

    const getContactsdata = async() =>{
        if(contacts)
        for(let i = 0; i < contacts.length; i++){
            let result = await readContract(config, {
                address: process.env.REACT_APP_ContractAddress,
                abi: ContractAbi.abi,
                functionName:'getIdentityByAddress',
                args:[contacts[i]],
                chainId: polygonAmoy.id
            })
            setContactDetails((prevItems) => [...prevItems, result])
        }
    }

  return (
    <div>
      {!contactDetails?<span className="text-white mt-4">No Contacts found.</span>:<></>}
    </div>
  )
}

export default Contacts

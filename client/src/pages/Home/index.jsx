import React from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { Spin, ConfigProvider, Dropdown , Tabs } from "antd";
import ContractAbi from '../../Contractcalls/Abi/contractabi.json'
import { useEffect, useState } from 'react'
import { Customconnectbutton } from '../../components/customconnectbutton'
import { useNavigate } from 'react-router-dom';
import Logo from "../../images/DecentraIDFull.png"
import Search from './components/search';
import Contacts from './components/contacts';
import Settings from './components/settings';

export default function Home() {
    const navigate = useNavigate();
    const [userData,setUserData] = useState();
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
        setUserData(data)
        console.log(data)
    }
},[isError, isPending, isSuccess,data, status])


const items=[
    {
        key:1,
        label:(
            <Customconnectbutton></Customconnectbutton>
        ),
    }
]

const Tabitems=[
    {
        key: '1',
        label: 'Search',
        children: <Search/>,
      },
      {
        key: '2',
        label: 'Contacts',
        children: <Contacts></Contacts>,
      },
      {
        key: '3',
        label: 'Settings',
        children: <Settings/>,
      },
]

  return (
    <div className='w-screen h-screen flex justify-center bg-[#1b1a21]'>
        {isSuccess? 
        <div className='flex flex-col w-screen'>
            <div className='w-full bg-[#6b65c2] h-[100px] flex flex-row px-8 items-center gap-8 justify-between'>
                <div className='flex flex-row gap-8 items-center'>
                <img className='w-[70px] h-[70px]' src={Logo}></img>
                <span className='font-ClashGrotesk text-5xl font-bold text-white tracking-wider'>DecentraID</span>
                </div>
                <ConfigProvider
                theme={{
                    token: {
                        colorBgElevated: '#302f36',
                        colorPrimary: "#FFFFFF",
                        colorText: "#A9A99F",
                    },
                }}
                >
                <Dropdown menu={{items}} placement='bottomRight' arrow className='justify-self-end'>
            <div className=" items-center flex relative">
                <img src={data[3]}
                    className="object-cover btn- w-[60px] h-[60px] rounded-full mr-2" alt="" />
                <div className="flex flex-col">
                    <span className="font-semibold text-white text-2xl">{data[2]}</span>
                    <p className="font-medium text-sm text-white text-opacity-70">{data[0]}</p>
                    <p className="font-medium text-sm text-white text-opacity-70">{data[1]}</p>
                </div>
            </div>
        </Dropdown></ConfigProvider>
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgElevated: '#302f36',
                        colorPrimary: "#FFFFFF",
                        colorText: "#A9A99F",
                    },
                }}
                ><Tabs className='self-center' defaultActiveKey="1" items={Tabitems}/></ConfigProvider>
        </div>: 
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
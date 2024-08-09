import React, {useEffect, useState} from 'react'
import { useWriteContract } from 'wagmi';
import contractAbi from '../../Contractcalls/Abi/contractabi.json'
import { useNavigate } from 'react-router-dom';
import { message, Spin, ConfigProvider } from 'antd';

const Signup = () => {
    const {writeContract, isPending, isSuccess, isError, error} = useWriteContract();
    const Navigate = useNavigate()
        // let {data: result, isSuccess: isWriteSuccess} = useWriteContract({
    //     address: process.env.REACT_APP_ContractAddress,
    //     abi: ContractAbi,
    //     functionName:'registerIdentity',
    //     args:["Mohammed Aasim", "Choudhry", "Scorp_12", "https://cdn-icons-png.flaticon.com/512/9203/9203764.png", false]
    // })
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [isLoading, setisLoading] = useState(false)
    
    useEffect(()=>{
        console.log('error',error)
        console.log('isSuccess', isSuccess)
        console.log('ispending', isPending)
        if(isSuccess){
            Navigate('/home')
            message.success("Identity Created Successfully!")
        }
        else if(isError){
            message.error(error.cause.data.args[0])
        }
    },[isPending, isSuccess,isError])


    const submitHandler = async(e) =>{
        e.preventDefault();
        setisLoading(true)
        await writeContract({
            address: process.env.REACT_APP_ContractAddress,
             abi: contractAbi.abi,
            functionName:'registerIdentity',
            args:[firstName, lastName, userName, profileUrl, false],
        })
    }

  return (
    <div className='min-h-screen w-screen bg-[#1b1a21] flex flex-col justify-center'>
      <div className='w-fit h-fit bg-[#6F61C0] self-center rounded-3xl flex flex-col bg-opacity-60'>
      <form
              className="flex flex-col p-10 self-center gap-2"
              onSubmit={submitHandler}
            >
              <text className="text-white font-bold text-[32px] self-center mb-2">
                Signup
              </text>
              <text className="font-normal self-center text-white text-opacity-80 text-[18px] mb-4">
                Create an account to get started!
              </text>
              <text className="font-medium text-white text-opacity-80 text-[18px] mb-2">
                Username
              </text>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className=" w-full p-3 font-clashgrotesk font-semibold text-[20px] text-white text-opacity-90  rounded-xl bg-[#6b65c2] bg-opacity-60"
                  placeholder="Eg: Scorp_12"
                />
                <div className='grid grid-cols-2 w-full my-2 gap-4'>
                    <div className='flex flex-col'>
                        <text className="font-medium text-white text-opacity-80 text-[18px] mb-2">
                            First Name
                        </text>
                        <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className=" w-full p-3 font-clashgrotesk font-semibold text-[20px] text-white text-opacity-80  rounded-xl bg-[#6b65c2] bg-opacity-60"
                        placeholder="First Name"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <text className="font-medium text-white text-opacity-80 text-[18px] mb-2">
                            Last Name
                        </text>
                        <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className=" w-full p-3 font-clashgrotesk font-semibold text-[20px] text-white text-opacity-80 rounded-xl bg-[#6b65c2] bg-opacity-60"
                        placeholder="Last Name"
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                  <text className="font-medium text-white text-opacity-80 text-[18px]">
                    Profile Picture Url
                  </text>
                </div>
                <input
                  type="text"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  className="w-full p-3 text-white text-opacity-80 font-clashgrotesk font-semibold text-[20px]  rounded-xl bg-[#6b65c2] bg-opacity-60"
                  placeholder="Eg: https://mylink/image.png"
                />
                {!isPending?
              <button
                className="bg-[#6b65c2] w-full h-[56px] rounded-xl mt-8 self-center text-white text-[20px] font-bold"
                type="submit"
              >
                {" "}
                Sign Up
              </button> : <button
                className="bg-[#6b65c2] w-full h-[56px] rounded-xl mt-8 self-center text-white text-[20px] font-bold opacity-50"
              >
                <ConfigProvider
  theme={{
    token: {
      colorPrimary: '#ffffff'
    },
  }}
>
      <Spin className='self-center justify-center'/> </ConfigProvider>
              </button>}
            </form>
      </div>
    </div>
  )
}

export default Signup

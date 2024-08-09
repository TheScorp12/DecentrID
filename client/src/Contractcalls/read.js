import { readContract } from '@wagmi/core'
import ContractAbi from './Abi/contractabi.json'

const Getprofile = async () =>{
    const data = await readContract({
        address: process.env.REACT_APP_ContractAddress,
        abi: ContractAbi,
        functionName:'getIdentityByAddress',
        args:['0xC9F58a37fEa347683edBdD55d4Ca9CC51797fd84']
    })
    console.log(data)
    return data;
}

export {Getprofile};
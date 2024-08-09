import React from 'react'

const Signup = () => {
  return (
    <div className='h-screen w-screen bg-[#1b1a21] flex flex-col justify-center'>
      <div className='w-1/2 h-2/3 bg-[#6F61C0] self-center rounded-3xl flex flex-col bg-opacity-60'>
      <form
              className="flex flex-col p-10 self-center gap-2"
              onSubmit={''}
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
                  id="email"
                  value={''}
                  onChange={'(e) => setemail(e.target.value)'}
                  className=" w-full p-3 font-clashgrotesk font-semibold text-[20px] text-black  rounded-xl bg-[#6b65c2] bg-opacity-60"
                  placeholder="Eg: Scorp_12"
                />
                <div className='grid grid-cols-2 w-full my-2 gap-4'>
                    <div className='flex flex-col'>
                        <text className="font-medium text-white text-opacity-80 text-[18px] mb-2">
                            First Name
                        </text>
                        <input
                        type="text"
                        id="email"
                        value={''}
                        onChange={'(e) => setemail(e.target.value)'}
                        className=" w-full p-3 font-clashgrotesk font-semibold text-[20px] text-black  rounded-xl bg-[#6b65c2] bg-opacity-60"
                        placeholder="First Name"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <text className="font-medium text-white text-opacity-80 text-[18px] mb-2">
                            Last Name
                        </text>
                        <input
                        type="text"
                        id="email"
                        value={''}
                        onChange={'(e) => setemail(e.target.value)'}
                        className=" w-full p-3 font-clashgrotesk font-semibold text-[20px] text-black  rounded-xl bg-[#6b65c2] bg-opacity-60"
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
                  id="email"
                  value={''}
                  onChange={'(e) => setPassword(e.target.value)'}
                  className="w-full p-3 text-[#202224] font-clashgrotesk font-semibold text-[20px]  rounded-xl bg-[#6b65c2] bg-opacity-60"
                  placeholder="Eg: https://mylink/image.png"
                />
              <button
                className="bg-[#6b65c2] w-full h-[56px] rounded-xl mt-8 self-center text-white text-[20px] font-bold"
                type="submit"
              >
                {" "}
                Sign Up
              </button>
            </form>
      </div>
    </div>
  )
}

export default Signup

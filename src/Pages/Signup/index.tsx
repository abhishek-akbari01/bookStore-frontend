import React from 'react'
import { useNavigate } from 'react-router-dom'
import {postAPI} from "../../api"
function Signup() {


    const navigate = useNavigate()

    const handleSubmit = async(event:React.SyntheticEvent)=>{
        event.preventDefault()

        const form = event.target as HTMLFormElement;
        const formElements = form.elements as HTMLFormControlsCollection;
        let name = formElements.namedItem('username')
        let email = formElements.namedItem('email')
        let password = formElements.namedItem('password')

        let response = await postAPI("api/user/register",
            {

                name : (name as HTMLInputElement)?.value,
                email: (email as HTMLInputElement)?.value,
                password: (password as HTMLInputElement)?.value,
            })
            console.log("response  : ",response);
            if(response?.data?.success){
                navigate('/login')
            }
            
    }

  return (
    <>
          <div className=" h-screen overflow-hidden flex items-center justify-center">
                <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
                    <div className="text-center text-2xl font-semibold">
                        Signup
                    </div>
                    <form className="p-12 md:p-10" onSubmit={handleSubmit}>
                        <div className="text-lg mb-6 md:mb-8">
                            <label className='font-semibold' >Email</label>
                            <input type="text" name="email" className="bg-gray-200 pl-4 py-2 mt-2 md:py-4 focus:outline-none w-full" placeholder="Email" />
                        </div>
                        <div className="text-lg mb-6 md:mb-8">
                            <label  className='font-semibold' >Username</label>
                            <input type="text" name="username"  className="bg-gray-200 pl-4 py-2 mt-2 md:py-4 focus:outline-none w-full" placeholder="Username" />
                        </div>
                        <div className="text-lg mb-6 md:mb-8">
                            <label  className='font-semibold' >Password</label>
                            <input type="password" id="password" name='password' className="bg-gray-200 pl-4 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
                        </div>
                        <button className="bg-black font-medium p-2 md:p-4 text-white uppercase w-full">sign up</button>
                    </form>
                </div>
            </div>
    
    
    </>
  )
}

export default Signup
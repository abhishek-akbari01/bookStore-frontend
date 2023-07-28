import React, { useEffect } from 'react'
import {postAPI} from "../../api"
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

  interface USER {
    id: number;
    name: string;
    email: string;
    points:number
  }

const userState = atom<USER>({
    key: 'userState',
    default: {} as USER,
  });

function Profile() {

    
    const [userData,setUserData] = useRecoilState(userState)

    const getUser = async()=>{
        let userData:string = localStorage.getItem("userData")||"{}"
        let user:USER = JSON.parse(userData)
        if(user?.email){
            let response = await postAPI("api/user/getUser",{email:user.email})
            console.log("response : ",response);
            if(response?.data?.user){
                localStorage.setItem("userData",JSON.stringify(response.data.user))
                setUserData(response.data.user)
            }
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    return (
        <>
            <div className="relative max-w-md mx-auto md:max-w-2xl text-[#1e1e1e] min-w-0 break-words bg-white w-full mb-6 shadow-lg border rounded-xl mt-16">
                <div className="px-6">
                    <div className="text-center mt-5">
                        <h3 className="text-2xl  font-bold leading-normal mb-1">{userData?.name}</h3>
                    </div>
                    <div className="text-center mt-2">
                        <h3 className="text-lg  font-bold leading-normal mb-1">{userData?.email}</h3>
                    </div>

                    <div className="mt-6 py-6 border-t border-slate-200 text-center">
                        <div className="flex justify-center items-center">
                            <div className='text-xl font-semibold'>Points :</div>
                            <div className='ml-3 text-lg font-semibold'>{userData?.points}</div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Profile
import React, { useEffect, useState } from 'react'
import Nav from '../../Component/Nav';
import {Link} from 'react-router-dom'
import {postAPI} from "../../api"
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
import { toast } from 'react-toastify';

interface Book {
    id: number;
    title: string;
    writer: string;
    coverImage:string,
    points:number
  }

  interface USER {
    id: number;
    name: string;
    email: string;
    points:number
  }
const orderState = atom<Book[]>({
    key: 'orderState',
    default: [],
});

function Order() {

    const [orderBooks,setOrderBooks] = useRecoilState(orderState)
    
    const getUser = async()=>{
        let userData:string = localStorage.getItem("userData")||"{}"
        let user:USER = JSON.parse(userData)
        console.log("userData : ",userData);
        
        if(user?.email){
            let response = await postAPI("api/user/getUser",{email:user.email})
            console.log("response : ",response);
            if(response?.data?.user){
                console.log("response.data.user : ",response.data.user.orderBooks);
                setOrderBooks(response.data.user.orderBooks)
                // localStorage.setItem("userData",JSON.stringify(response.data.user))
                // setUserData(response.data.user)
            }
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    const handleClick = async(bookId:number)=>{
        let userData:string = localStorage.getItem("userData") || ""
        let user:USER = JSON.parse(userData)
        let response = await postAPI("api/order/cancelOrd",{userId:user.id,bookId:bookId})
        if(response){
            toast.success("Order canceled successfully")
            getUser()
        }
    }


    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 gap-y-32 lg:grid-cols-4 justify-items-center mt-10'>
                {orderBooks.map((item:Book) => {
                    return (
                        <>
                                <Link to="#" className='w-full h-[150px]  sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]'>
                                <div className=''>
                                    <img src={item.coverImage} alt="" />
                                    {/* <img src={require('../../images/568165.png')} className='w-[20px] h-[20px] ' alt="" /> */}
                                </div>
                                <div className='px-2 font-semibold mt-1'>
                                    {item.title}
                                </div>
                                <div className='px-2 font-semibold mt-1'>
                                    {item.writer}
                                </div>
                                <div className='flex justify-between px-2 mt-1.5 mb-2'>
                                    <div className='text-sm text-red-500 font-bold'>10%</div>
                                    <div className='text-base text-black font-bold'>{item.points}</div>
                                </div>
                                <button
                                    type="button"
                                    onClick={()=>{handleClick(item.id)}}
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Cancel Order
                                </button>
                            </Link>
                        </>
                    )
                })}

            </div>


        </>
    )
}

export default Order
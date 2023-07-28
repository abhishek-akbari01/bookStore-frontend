import React, { useEffect } from 'react';
import {postAPI} from "../../api"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { useSearchParams } from 'react-router-dom';
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

const singleBook = atom<Book>({
  key: 'singleBook',
  default: {} as Book,
});


function Single() {

  const [bookData,setBookData] = useRecoilState(singleBook)
  const [params,setParams] = useSearchParams()

  useEffect(()=>{
      getBook()
  },[])

  const getBook = async()=>{
    let response = await postAPI("api/book/getBook",{id:params.get("id")})
    console.log("response : ",response);
    if(response?.data?.book){
        setBookData(response.data.book)
    }
  }

  const handleClick=async()=>{
    let userData:string= localStorage.getItem("userData") || ""

    let user:USER = JSON.parse(userData)
    let response = await postAPI("api/order/createOrd",{userId:user.id,bookId:params.get("id")})
    if(response){
      toast.success("Order placed successfully")
    }
  }

  return (
   <>
   <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <div
            className="h-64 w-full rounded object-cover bg-slate-200 lg:h-96 lg:w-1/2"
          >
            <img src={bookData.coverImage} alt="" />
          </div>
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">{bookData.title}</h2>
            <h1 className="my-4 text-3xl font-semibold text-black">{bookData.writer}</h1>
           
            <p className="leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur rem amet repudiandae
              neque adipisci eum enim, natus illo inventore totam?
            </p>
           
            <div className="flex items-center justify-between mt-5">
              <span className="title-font text-xl font-bold text-gray-900">${bookData.points}</span>
              <button
                type="button"
                onClick={handleClick}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
   </>
  )
}

export default Single
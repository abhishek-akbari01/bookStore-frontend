import React, { useEffect, useState } from 'react'
import Nav from '../../Component/Nav';
import {Link} from 'react-router-dom'
import {getAPI} from "../../api"
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

  interface Book {
    id: number;
    title: string;
    writer: string;
    coverImage:string,
    points:number
  }

const bookState = atom<Book[]>({
    key: 'bookState',
    default: [],
  });



function Home() {

    const [books,setBooks] = useRecoilState(bookState)

    const getBooks = async()=>{
        let response = await getAPI("api/book/getAllBooks")
        console.log("response : ",response);
        if(response?.data?.books){
            setBooks(response.data.books)
        }
    }

    useEffect(()=>{
        getBooks()
    },[])

    useEffect(()=>{
        console.log("books : ",books);
        
    },[books])

    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 gap-y-32 lg:grid-cols-4 justify-items-center mt-10'>
                {books.map((item:Book) => {
                    return (
                        <>
                                <Link to={`/single?id=${item.id}`} className='w-full h-[150px]  sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]'>
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
                            </Link>
                        </>
                    )
                })}

            </div>


        </>
    )
}

export default Home
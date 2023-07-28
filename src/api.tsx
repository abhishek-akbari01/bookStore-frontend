import axios from "axios";
import config from "./config"

interface UnexpectedObject {
    [key: string]: any;
  }

export const getAPI = async (path:string)=>{
    return await axios.get(`${config.API_URL}/${path}`)
}

export const postAPI = async (path:string, body:UnexpectedObject)=>{
    return await axios.post(`${config.API_URL}/${path}`,body)
}
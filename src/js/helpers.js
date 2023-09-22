import { TIME_OUT } from "./config";
import { async } from "regenerator-runtime";

export const timeout=function(s){
    return new Promise(function(_,reject){
        setTimeout(function(){
            reject(new Error(`Request took too long! Timeout after ${s} second`))
        },s*1000)
    })
}
export const getJSON=async (url)=>{
    try{
    const response= await Promise.race([fetch(url),timeout(TIME_OUT)]);
    const data=await response.json();
    if(!response.ok) throw new Error(`${data.message}`);
    return data;
    }catch (error) {
    // rethrowing error 
    throw error
    }
}
export const sentJSON=async (url,sentData)=>{
    try{
        const fetchSend=fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(sentData),
        })
    const response= await Promise.race([fetchSend,timeout(TIME_OUT)]);
    const data=await response.json();
    if(!response.ok) throw new Error(`${data.message}`);
    return data;
    }catch (error) {
    // rethrowing error 
    throw error
    }
}
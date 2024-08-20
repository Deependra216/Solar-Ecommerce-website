import axios from "axios";
var serverURL='http://192.168.29.132:2000';

const sendData =async(url,body)=>{
    try{
        var response =await axios.post(`${serverURL}/${url}`,body)
        var r=response.data
        console.log(r);
        return r;
    }
    catch(e)
    {
        console.log(e);
        return null
    }
}

const  postData=async(url,body)=>{
 
    try {
    //we are making it async
        var response = await axios.post(`${serverURL}/${url}`,body)
        var result =response.data
        console.log(response)
        console.log(result)
        return result
        
       }
    catch(e)
    {
        
        console.log(e);
        return null;
        
    }
}

const getData=async(url)=>{
    try
    {
        var response = await axios.get(`${serverURL}/${url}`)
        var result = response.data
        console.log(result)
        return result
    }
    catch(e)
    {
        console.log(e)
        return null
        
    }
}

export {serverURL,postData,getData,sendData}
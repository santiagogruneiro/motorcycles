import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL


const getSchedule = async()=>{
    return await axios.get(baseUrl).then(res=>res.data).catch(err=>alert(err))
}
const increase = async (value) =>{
    value = value + 'sinc'
    let url = baseUrl + value
    console.log(url)
  return await axios.put(url).then(res=>res.data).catch(err=>alert(err))
}

const decrease = async (value) =>{
    value = value + 'sdec'
    let url = baseUrl + value
    return await axios.put(url).then(res=>res.data).catch(err=>alert(err))
}

export const handlerSchedule = {
    getSchedule,
    increase,
    decrease
}
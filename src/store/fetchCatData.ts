import axios from 'axios';
import { create } from 'zustand'

export  const fetchCatData = create((set) => ({
  count: 1,
  loading : false,
  error : false,
  data : [],
  fetchData : async()=>{
    try {
      set({loading : true})
      const res = await axios.get("/api/category");
      set({
        data : res?.data
      })
      set({loading : false})
    } catch (error) {
      set({error : true})
        console.log(error);
        
    }finally{
      set({loading : false})
    }
  }
}))
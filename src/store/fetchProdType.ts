import axios from 'axios';
import { create } from 'zustand'

export  const fetchProdType = create((set) => ({
  loading : false,
  error : false,
  data : [],
  fetchProdTypeData : async()=>{
    try {
      set({loading : true})
      const res = await axios.get("/api/type");
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
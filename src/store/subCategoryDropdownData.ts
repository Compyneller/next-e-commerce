import { create } from 'zustand';

export  const subCategoryDropdownData = create((set) => ({
  subcategory : [],
  setSubcategory: (subcategory : any) => set({ subcategory }),

}))
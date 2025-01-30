import {create} from 'zustand'

interface useModalStoreProps {
    isOpen: boolean;
    data : any;
    onClose: () => void;
    onOpen: () => void;
}

export const useStoreModal = create<useModalStoreProps>((set) => ({
    isOpen: false,
    data : {},
    onClose: () => set({isOpen: false}),
    onOpen: () => set({isOpen: true}),
    setData : (items : any)=>set({data : items})
}))
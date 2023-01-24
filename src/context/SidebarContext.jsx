import { createContext, useState } from 'react'
export const SidebarContext = createContext({
    isContactsOpen: true,
    setIsContactsOpen: () => {},
    isMessagesOpen: false,
    setIsMessagesOpen: () => {},
})
export const SidebarProvider = ({ children }) => {
    const [ isContactsOpen, setIsContactsOpen ] = useState(true);
    const [ isMessagesOpen, setIsMessagesOpen ] = useState(false);
    const value = { isContactsOpen, setIsContactsOpen, isMessagesOpen, setIsMessagesOpen };
    return (
        <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
    )
}
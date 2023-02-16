import React, { createContext, useState } from 'react'

export const LoginContext = createContext(null)

const ContextProvider = ({children}) => {
    const [account,setAccount]=useState()
  return (
    <LoginContext.Provider value={{account,setAccount}}>
        <div>{children}</div>
    </LoginContext.Provider>
    
  )
}

export default ContextProvider;

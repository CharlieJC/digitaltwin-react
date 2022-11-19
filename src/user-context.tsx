import * as React from 'react'
import { User, verifyToken } from './models/auth-model'

type UserContextProviderProps = {
  children: React.ReactNode
}
type UserState = {
  loggedIn: boolean
  user: User | undefined
}
type UserContextType = {
  userData: UserState
  setUserData: React.Dispatch<React.SetStateAction<UserState>>
  processToken: () => void
}

// context will never be used outside of provider so {} as UserContextType is safe
const UserContext = React.createContext<UserContextType>({} as UserContextType)
const UserContextProvider = (props: UserContextProviderProps) => {
  const [userData, setUserData] = React.useState<UserState>({ loggedIn: false, user: undefined })
  const { children } = props
  const processToken = () => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) throw Error('No user token found!')

      const user = await verifyToken(token)
      setUserData({ loggedIn: true, user })
    }
    fetchData().catch(console.error)
  }
  const userContextValues = React.useMemo(() => ({ userData, setUserData, processToken }), [])
  return <UserContext.Provider value={userContextValues}>{children}</UserContext.Provider>
}

export { UserContext, UserContextProvider }

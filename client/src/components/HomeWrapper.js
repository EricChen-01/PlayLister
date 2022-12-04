import { useContext, useEffect} from 'react'
import SplashScreen from './SplashScreen'
import HomeScreen from './HomeScreen'
import AuthContext from '../auth'
import GlobalStoreContext from '../store'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const {store} = useContext(GlobalStoreContext);
    
    if (auth.loggedIn || auth.guest){
        return <HomeScreen />
    }else
        return <SplashScreen />
} 
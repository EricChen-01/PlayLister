import { useContext, useEffect} from 'react'
import SplashScreen from './SplashScreen'
import HomeScreen from './HomeScreen'
import AuthContext from '../auth'
import GlobalStoreContext from '../store'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const {store} = useContext(GlobalStoreContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    console.log("HomeWrapper auth.guest: " + auth.guest);
    
    if (auth.loggedIn || auth.guest){
        return <HomeScreen />
    }else
        return <SplashScreen />
} 
import { useContext } from 'react'
import SplashScreen from './SplashScreen'
import HomeScreen from './HomeScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    if ( false || auth.loggedIn || auth.guest)
        return <HomeScreen />
    else
        return <SplashScreen />
} 
import { useContext } from 'react'
import SplashScreen from './SplashScreen'
import HomeScreen from './HomeScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    
    if ( false || auth.loggedIn || auth.guest)
        return <HomeScreen />
    else
        return <SplashScreen />
} 
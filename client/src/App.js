import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    HomeWrapper,
    RegisterScreen
} from './components'

const App = () => {   
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>             
                    <Switch>
                        <Route path="/" exact component={HomeWrapper} />
                        <Route path="/login/" exact component={null} />
                        <Route path="/register/" exact component={RegisterScreen} />
                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App
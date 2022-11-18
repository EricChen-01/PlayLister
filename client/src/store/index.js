import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import AuthContext from '../auth'


export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {

}

const tps = new jsTPS();

const CurrentModal = {
}

function GlobalStoreContextProvider(props) {

    const [store, setStore] = useState({
    });
    const history = useHistory();

    const { auth } = useContext(AuthContext);
    

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            default:
                return store;
        }
    }

    
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
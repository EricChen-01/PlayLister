import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import AuthContext from '../auth'


export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST : "SET_CURRENT_LIST",
    SET_SELECTION_TYPE : "SET_SELECTION_TYPE",
    HIDE_MODALS : "HIDE_MODALS",
    ADD_LIST_ERROR : "ADD_LIST_ERROR",
    EXPAND_LIST : "EXPAND_LIST",
}

const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    REMOVE_SONG : "REMOVE_SONG",
    EDIT_SONG : "EDIT_SONG",
    DUPLICATE_LIST : "DUPLICATE_LIST",
    ADD_LIST_ERROR : "ADD_LIST_ERROR",
}

const SearchSelection = {
    HOME : "HOME",
    ALL_LISTS : "ALL_LISTS",
    USERS : "USERS",
}

function GlobalStoreContextProvider(props) {

    const [store, setStore] = useState({
        currentModal: CurrentModal.NONE,
        currentSelection: SearchSelection.ALL_LISTS,
        idNamePairs: [],
        currentList: null,
        currentSongIndex: -1,
        currentSong: null,
        newListCounter:0,
        listNameActive:false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        listIdMarkedForDuplication: null,
        listMarkedForDuplication: null,
        expanded: false
    });
    const history = useHistory();

    const { auth } = useContext(AuthContext);
    

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: payload._id
                }));
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    idNamePairs: payload,
                    currentList: prevState.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: prevState.expanded
                }));
            }
            // SINGLE CLICKS ON LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: (prevState.expanded === payload._id) ? prevState.expanded : false
                }));
            }

            case GlobalStoreActionType.SET_SELECTION_TYPE: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: payload,
                    idNamePairs: [],
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: false,
                })); 
            }
            // HIDES ALL MODALS IN DISPLAY
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: prevState.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: false,
                }));
            }
            // SHOWS ADDING A LIST ERROR
            case GlobalStoreActionType.ADD_LIST_ERROR: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.ADD_LIST_ERROR,
                    currentSelection: prevState.currentSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: prevState.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: false,
                }));
            }
            case GlobalStoreActionType.EXPAND_LIST:{
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: prevState.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: payload,
                }));
            }
            default:
                return store;
        }
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let currentNumber = 1;
        while(store.idNamePairs.some(a => a.name === newListName)){
            newListName = "Untitled" + store.newListCounter + " (" + currentNumber + ")";
            currentNumber++;
        }
        const response = await api.createPlaylist(newListName, [], auth.user.email, false, 0,0,[],null);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );
            history.push("/");  
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }
    store.publishList = async function () {
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        if(store.currentList){
            let list = store.currentList;
            list.isPublished = true;
            list.datePublished = date;
            //update the list
            store.updateCurrentList();
        }
    }
    // LOADS PLAYLISTS 
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        async function asyncLoadPublicIdNamePairs() {
            const response = await api.getPublicPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        if (store.currentSelection == SearchSelection.HOME){
            console.log('selection is HOME');
            asyncLoadIdNamePairs();
        }else if (store.currentSelection == SearchSelection.ALL_LISTS){
            console.log('selection is ALL_LIST');
            asyncLoadPublicIdNamePairs();
        }else if (store.currentSelection == SearchSelection.USERS) {
            console.log('selection is USERS');
        }
        
    }

    store.changeSelectionToHome = function() {
        storeReducer({
            type: GlobalStoreActionType.SET_SELECTION_TYPE,
            payload: SearchSelection.HOME
        });
    }

    store.changeSelectionToAllLists = function() {
        storeReducer({
            type: GlobalStoreActionType.SET_SELECTION_TYPE,
            payload: SearchSelection.ALL_LISTS
        });
    }

    store.changeSelectionToUsers = function() {
        storeReducer({
            type: GlobalStoreActionType.SET_SELECTION_TYPE,
            payload: SearchSelection.USERS
        });
    }

    store.setCurrentList = function(id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: playlist
                });
            }
        }
        asyncSetCurrentList(id);
    }
    store.addListError = function(){
        storeReducer({
            type: GlobalStoreActionType.ADD_LIST_ERROR,
            payload: {}
        });  
    }
    store.hideModals = function() {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.expandList = function(id){
        let payload = (store.expanded === id ? false : id)
        
        storeReducer({
            type: GlobalStoreActionType.EXPAND_LIST,
            payload: payload
        });  
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                console.log('success update current playlist')
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
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
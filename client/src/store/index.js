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
    SET_CURRENT_SONG_PLAYING : "SET_CURRENT_SONG_PLAYING",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    CHANGE_LIST_NAME : "CHANGE_LIST_NAME",
    SELECT_SORT_TYPE : "SELECT_SORT_TYPE",
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

const SortSelection = {
    NONE : "NONE",
    NAME: "NAME",
    PUBLISH_DATE: "PUBLISH_DATE",
    LISTENS: "LISTENS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES",
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
        sortSelection: SortSelection.NONE,
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
        expanded: false,
        currentSongPlaying: 0,
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
                    sortSelection: prevState.sortSelection,
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
                    expanded: payload._id,
                    currentSongPlaying: prevState.currentSongPlaying,
                }));
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    sortSelection: prevState.sortSelection,
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
                    expanded: prevState.expanded,
                    currentSongPlaying: prevState.currentSongPlaying,
                }));
            }
            // SINGLE CLICKS ON LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    sortSelection: prevState.sortSelection,
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
                    expanded: (prevState.expanded === payload._id) ? prevState.expanded : false,
                    currentSongPlaying: 0,
                }));
            }
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.DELETE_LIST,
                    currentSelection: prevState.currentSelection,
                    sortSelection: prevState.sortSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: false,
                    currentSongPlaying: prevState.currentSongPlaying,
                }));
            }
            case GlobalStoreActionType.SET_SELECTION_TYPE: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: payload,
                    sortSelection: SortSelection.NONE,
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
                    currentSongPlaying: prevState.currentSongPlaying,
                })); 
            }
            // HIDES ALL MODALS IN DISPLAY
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    sortSelection: prevState.sortSelection,
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
                    currentSongPlaying: prevState.currentSongPlaying,
                }));
            }
            // SHOWS ADDING A LIST ERROR
            case GlobalStoreActionType.ADD_LIST_ERROR: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.ADD_LIST_ERROR,
                    currentSelection: prevState.currentSelection,
                    sortSelection: prevState.sortSelection,
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
                    currentSongPlaying: prevState.currentSongPlaying,
                }));
            }
            // EXPANDS AND DEXPAND LISTS
            case GlobalStoreActionType.EXPAND_LIST:{
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    sortSelection: prevState.sortSelection,
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
                    currentSongPlaying: prevState.currentSongPlaying,
                }));
            }
            // SETS CURRENT SONG THATS PLAYING 
            case GlobalStoreActionType.SET_CURRENT_SONG_PLAYING:{
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    sortSelection: prevState.sortSelection,
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
                    currentSongPlaying: payload,
                }));
            }
            // SETS EDIT ACTIVE FOR LISTS
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    sortSelection: prevState.sortSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: false,
                    currentSongPlaying: 0,
                }));
            }
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    sortSelection: prevState.sortSelection,
                    idNamePairs: payload,
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
                    currentSongPlaying: 0,
                }));
            }
            case GlobalStoreActionType.SELECT_SORT_TYPE: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    sortSelection: payload,
                    idNamePairs: prevState.idNamePairs,
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
                    currentSongPlaying: 0,
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
        const response = await api.createPlaylist(newListName, [], auth.user.email, false, 0,0,0,[],null);//newListName, newSongs, userEmail, published, likes, dislikes,listens, comments,datePublished
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
        if(store.currentList){
            let list = store.currentList;
            list.isPublished = true;
            list.datePublished = current;
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
                console.log(store.sortSelection)
                if(store.sortSelection === SortSelection.NAME){
                    pairsArray = store.idNamePairs.sort((a,b) => a.name > b.name);
                }else if(store.sortSelection === SortSelection.PUBLISH_DATE){
                    pairsArray = store.idNamePairs.sort((a,b) => a.datePublished > b.datePublished);
                }else if (store.sortSelection === SortSelection.LISTENS){
                    pairsArray = store.idNamePairs.sort((a,b) => a.listens > b.listens);
                }else if (store.sortSelection === SortSelection.LIKES){
                    pairsArray = store.idNamePairs.sort((a,b) => a.likes > b.likes);
                }else if (store.sortSelection === SortSelection.DISLIKES){
                    pairsArray = store.idNamePairs.sort((a,b) => a.dislikes > b.dislikes);
                }

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
                if(store.sortSelection === SortSelection.NAME){
                    pairsArray = store.idNamePairs.sort((a,b) => a.name > b.name);
                }else if(store.sortSelection === SortSelection.PUBLISH_DATE){
                    pairsArray = store.idNamePairs.sort((a,b) => a.datePublished > b.datePublished);
                }else if (store.sortSelection === SortSelection.LISTENS){
                    pairsArray = store.idNamePairs.sort((a,b) => a.listens > b.listens);
                }else if (store.sortSelection === SortSelection.LIKES){
                    pairsArray = store.idNamePairs.sort((a,b) => a.likes > b.likes);
                }else if (store.sortSelection === SortSelection.DISLIKES){
                    pairsArray = store.idNamePairs.sort((a,b) => a.dislikes > b.dislikes);
                }
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
    store.setCurrentSongPlaying = function(index){
        console.log('index is: ' + index);
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SONG_PLAYING,
            payload: index
        });
    }
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                store.loadIdNamePairs();
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        /*
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(playlist);
                        */
                       store.loadIdNamePairs();
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }
    store.sortByName = function(){
        storeReducer({
            type: GlobalStoreActionType.SELECT_SORT_TYPE,
            payload: SortSelection.NAME
        });
    }
    store.sortByNone = function(){
        storeReducer({
            type: GlobalStoreActionType.SELECT_SORT_TYPE,
            payload: SortSelection.NONE
        });
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
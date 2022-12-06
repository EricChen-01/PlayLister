import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import AuthContext from '../auth'

import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import { Store } from '@mui/icons-material'

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST : "SET_CURRENT_LIST",
    SET_SELECTION_TYPE : "SET_SELECTION_TYPE",
    HIDE_MODALS : "HIDE_MODALS",
    CHANGE_LIST_ERROR : "ADD_LIST_ERROR",
    EXPAND_LIST : "EXPAND_LIST",
    SET_CURRENT_SONG_PLAYING : "SET_CURRENT_SONG_PLAYING",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    CHANGE_LIST_NAME : "CHANGE_LIST_NAME",
    SELECT_SORT_TYPE : "SELECT_SORT_TYPE",
    REMOVE_SONG : "REMOVE_SONG",
    MARK_LIST_FOR_DUPLICATION: "MARK_LIST_FOR_DUPLICATION",
    SET_SEARCH_TEXT: "SET_SEARCH_TEXT",
    CLOSE_CURRENT_LIST : "CLOSE_CURRENT_LIST",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT"
}

const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    REMOVE_SONG : "REMOVE_SONG",
    EDIT_SONG : "EDIT_SONG",
    DUPLICATE_LIST : "DUPLICATE_LIST",
    CHANGE_LIST_ERROR : "CHANGE_LIST_ERROR",
}

const SortSelection = {
    NONE : "NONE",
    NAME: "NAME",
    PUBLISH_DATE: "PUBLISH_DATE",
    LISTENS: "LISTENS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES",
    CREATION_DATE: "CREATION_DATE",
    LAST_EDIT_DATE: "LAST_EDIT_DATE"
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
        searchText: '',
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
                    searchText: prevState.searchText,
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
                    currentSongPlaying: 0,
                }));
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    searchText: prevState.searchText,
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
                    searchText :prevState.searchText,
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
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    searchText :prevState.searchText,
                    sortSelection: prevState.sortSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: false,
                    currentSongPlaying: 0,
                }));
            }
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.DELETE_LIST,
                    currentSelection: prevState.currentSelection,
                    searchText :prevState.searchText,
                    sortSelection: prevState.sortSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: prevState.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: prevState.expanded,
                    currentSongPlaying: prevState.currentSongPlaying,
                }));
            }
            case GlobalStoreActionType.SET_SELECTION_TYPE: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: payload,
                    searchText: prevState.searchText,
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
                    searchText: prevState.searchText,
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
            case GlobalStoreActionType.CHANGE_LIST_ERROR: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.CHANGE_LIST_ERROR,
                    currentSelection: prevState.currentSelection,
                    searchText: prevState.searchText,
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
                    searchText: prevState.searchText,
                    sortSelection: prevState.sortSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: payload.value,
                    currentSongPlaying: (payload.playlist._id ===  ( (prevState.currentList)? prevState.currentList._id : null) )? prevState.currentSongPlaying : 0,
                }));
            }
            // SETS CURRENT SONG THATS PLAYING 
            case GlobalStoreActionType.SET_CURRENT_SONG_PLAYING:{
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    searchText: prevState.searchText,
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
                    expanded: prevState.expanded,
                    currentSongPlaying: payload,
                }));
            }
            // SETS EDIT ACTIVE FOR LISTS
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    searchText: prevState.searchText,
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
                    searchText: prevState.searchText,
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
                    searchText: prevState.searchText,
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
            case GlobalStoreActionType.REMOVE_SONG:{
                return setStore((prevState)=>({
                    currentModal : CurrentModal.REMOVE_SONG,
                    currentSelection: prevState.currentSelection,
                    searchText: prevState.searchText,
                    sortSelection: prevState.sortSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: prevState.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    listIdMarkedForDuplication: null,
                    listMarkedForDuplication: null,
                    expanded: prevState.expanded,
                    currentSongPlaying: prevState.currentSongPlaying,
                }));
            }
            case GlobalStoreActionType.MARK_LIST_FOR_DUPLICATION: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.DUPLICATE_LIST,
                    currentSelection: prevState.currentSelection,
                    searchText: prevState.searchText,
                    sortSelection: prevState.sortSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: prevState.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: prevState.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listIdMarkedForDuplication: payload.id,
                    listMarkedForDuplication: payload.playlist,
                    expanded: prevState.expanded,
                    currentSongPlaying: prevState.currentSongPlaying,
                }));
            }
            case GlobalStoreActionType.SET_SEARCH_TEXT: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.NONE,
                    currentSelection: prevState.currentSelection,
                    searchText: payload,
                    sortSelection: prevState.sortSelection,
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
            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore((prevState)=>({
                    currentModal : CurrentModal.EDIT_SONG,
                    currentSelection: prevState.currentSelection,
                    searchText: prevState.searchText,
                    sortSelection: prevState.sortSelection,
                    idNamePairs: prevState.idNamePairs,
                    currentList: prevState.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
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
                pairsArray = store.checkForSearch(pairsArray, store.searchText);
                pairsArray = store.checkForSort(pairsArray);
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
                pairsArray = store.checkForSearch(pairsArray, store.searchText);
                pairsArray = store.checkForSort(pairsArray);
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
            asyncLoadIdNamePairs();
        }else if (store.currentSelection == SearchSelection.ALL_LISTS){
            asyncLoadPublicIdNamePairs();
        }else if (store.currentSelection == SearchSelection.USERS) {
            console.log('selection is USERS');
            asyncLoadPublicIdNamePairs();
        }   
    }
    store.addListen = function(id){
        async function asyncAddListen(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.listens = playlist.listens + 1;
                let res = await api.updatePlaylistById(playlist._id,playlist);
                if (res.data.success){
                    store.loadIdNamePairs();
                }
            }
        }
        asyncAddListen(id);
    }
    store.updateRating = function(likes,dislikes,id){
        async function asyncUpdateRating(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.likes = likes;
                playlist.dislikes = dislikes;
                let res = await api.updatePlaylistById(playlist._id,playlist);
                if (res.data.success){
                    store.loadIdNamePairs();
                }
            }
        }
        asyncUpdateRating(id);
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
                tps.clearAllTransactions();
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: playlist
                });
            }
        }
        asyncSetCurrentList(id);
    }
    store.hideModals = function() {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.expandList = function(id){
        let value = (store.expanded === id ? false : id)
        async function asyncExpandList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                tps.clearAllTransactions();
                storeReducer({
                    type: GlobalStoreActionType.EXPAND_LIST,
                    payload: {value:value, playlist:playlist}
                });  
            }
        }
        asyncExpandList(id);
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
                store.closeCurrentList();
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.closeCurrentList = function() {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
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
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                pairsArray = store.checkForSort(pairsArray);
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        if(store.idNamePairs.some(a => a.name === newName)){
            storeReducer({
                type: GlobalStoreActionType.CHANGE_LIST_ERROR,
                payload: {}
            });  
        }else{
            asyncChangeListName(id);
        }
    }
    store.sortByName = function(){
        storeReducer({
            type: GlobalStoreActionType.SELECT_SORT_TYPE,
            payload: SortSelection.NAME
        });
    }
    store.sortByLikes = function(){
        storeReducer({
            type: GlobalStoreActionType.SELECT_SORT_TYPE,
            payload: SortSelection.LIKES
        });
    }
    store.sortByDislikes = function(){
        storeReducer({
            type: GlobalStoreActionType.SELECT_SORT_TYPE,
            payload: SortSelection.DISLIKES
        });
    }
    store.sortByPublishDate = function(){
        storeReducer({
            type: GlobalStoreActionType.SELECT_SORT_TYPE,
            payload: SortSelection.PUBLISH_DATE
        });
    }
    store.sortByListens = function(){
        storeReducer({
            type: GlobalStoreActionType.SELECT_SORT_TYPE,
            payload: SortSelection.LISTENS
        });
    }
    store.sortByCreationDate = function(){
        storeReducer({
            type: GlobalStoreActionType.SELECT_SORT_TYPE,
            payload: SortSelection.CREATION_DATE
        });
    }
    store.sortByLastEditDate = function(){
        storeReducer({
            type: GlobalStoreActionType.SELECT_SORT_TYPE,
            payload: SortSelection.LAST_EDIT_DATE
        });
    }
    store.checkForSort = function(pairsArray){
        if(store.sortSelection === SortSelection.NAME){
            return pairsArray.sort((a,b) => a.name > b.name);
        }else if(store.sortSelection === SortSelection.PUBLISH_DATE){
            return  pairsArray.sort((a,b) => a.datePublished > b.datePublished);
        }else if (store.sortSelection === SortSelection.LISTENS){
            return  pairsArray.sort((a,b) => a.listens < b.listens);
        }else if (store.sortSelection === SortSelection.LIKES){
            return  pairsArray.sort((a,b) => a.likes < b.likes);
        }else if (store.sortSelection === SortSelection.DISLIKES){
            return  pairsArray.sort((a,b) => a.dislikes < b.dislikes);
        }else if (store.sortSelection === SortSelection.CREATION_DATE){
            return  pairsArray.sort((a,b) => a.createdAt > b.createdAt);
        }else if(store.sortSelection === SortSelection.LAST_EDIT_DATE){
            return  pairsArray.sort((a,b) => a.updatedAt < b.updatedAt);
        }

        return pairsArray;
    }
    store.sendComment = function(comment){
        let list = store.currentList;  
        list.comments.push(comment);

        // make it official
        store.updateCurrentList();
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.markSongForDelete = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = function(){
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    store.markListForDuplication = function(id){
        async function getListToDup(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DUPLICATION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDup(id);
    }
    store.duplicateList = async function () {
        let newListName = store.listMarkedForDuplication.name;
        let currentNumber = 1;
        let usersList = await api.getPlaylistPairs();
        while(usersList.data.idNamePairs.some(a => a.name === newListName)){
            newListName = store.listMarkedForDuplication.name +  " (" + currentNumber + ")";
            currentNumber++;
        }
        const response = await api.createPlaylist(newListName, store.listMarkedForDuplication.songs, auth.user.email, false, 0,0,0,[],null);//newListName, newSongs, userEmail, published, likes, dislikes,listens, comments,datePublished
        if (response.status === 201) {
            tps.clearAllTransactions();
            store.loadIdNamePairs();
            history.push("/");  
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }
    store.search = function(text){
        function onlySpaces(str){
            return str.trim().length === 0;
        }
        async function asyncSearchBy() {
            const response = (store.currentSelection === SearchSelection.HOME) ? await api.getPlaylistPairs() : await api.getPublicPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                if(onlySpaces(text)){
                    // do nothing
                }else if(store.currentSelection === SearchSelection.HOME){
                    console.log('filter HOME by text')// all lists that have text as their title
                    pairsArray = pairsArray.filter(pair => pair.name === text);
                }else if(store.currentSelection === SearchSelection.ALL_LISTS){
                    console.log('filter all lists by text')
                    pairsArray = pairsArray.filter(pair => pair.name === text);
                }else if(store.currentSelection === SearchSelection.USERS){
                    console.log('filter users by text')
                    pairsArray = pairsArray.filter(pair => pair.ownerName === text);
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
        asyncSearchBy();
    }
    store.checkForSearch = function(pairsArray,text){
        function onlySpaces(str){
            return str.trim().length === 0;
        }
        if(onlySpaces(text)){
            return pairsArray;
        }else if(store.currentSelection === SearchSelection.HOME){
            console.log('filter HOME by text')// all lists that have text as their title
            pairsArray = pairsArray.filter(pair => pair.name === text);
        }else if(store.currentSelection === SearchSelection.ALL_LISTS){
            console.log('filter all lists by text')
            pairsArray = pairsArray.filter(pair => pair.name === text);
        }else if(store.currentSelection === SearchSelection.USERS){
            console.log('filter users by text')
            pairsArray = pairsArray.filter(pair => pair.ownerName === text);
        }
        return pairsArray;
    }
    store.setSearchText = function(text){
        storeReducer({
            type: GlobalStoreActionType.SET_SEARCH_TEXT,
            payload: text
        });
    }
    store.markSongForEdit = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    //TRANSACTIONS
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
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
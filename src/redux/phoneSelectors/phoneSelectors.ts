import {AppStateType} from "../store";
import { createSelector } from 'reselect';


export const getContacts =  (state:AppStateType) => {
    return state.phone.contacts.items
}
export const getFilter = (state:AppStateType) => {
    return state.phone.contacts.filter
}


export const filterContact = createSelector(
    [getContacts, getFilter], (contacts, filter) => {
        return contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    }
)
export const getError = (state:AppStateType) => {
    return state.phone.error
}
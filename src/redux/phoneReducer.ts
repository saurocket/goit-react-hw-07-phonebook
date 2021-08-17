import {ContactType} from "../Components/MainPage";
import {contactsFilter} from "./firlter";
import {BaseThunkType, InferActionTypes} from "./store";


const CONTACTS_URL = 'http://localhost:3000/contacts/'

export type ItemPhoneType = {
    id: string | number,
    name: string,
    number: string
}
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>


const initialState = {
    contacts: {
        items: [] as [] | Array<ItemPhoneType>,
        filter: ''
    },
    error: null as null | string,
}
type InitialStateType = typeof initialState
export const phoneReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "ADD_CONTACT":
            return {
                ...state, contacts: {
                    ...state.contacts,
                    items: contactsFilter([...action.payload])
                }
            }

        case "DELETE_CONTACT":
            return {
                ...state, contacts: {
                    ...state.contacts,
                    items: [...state.contacts.items.filter(item => item.id !== action.payload)]
                }
            }
        case "FILTER_CONTACT":
            return {...state, contacts: {...state.contacts, filter: action.payload}}
        case   "THROW_ERROR": {
            return {...state, error: action.payload}
        }
        case "RESET_ERROR": {
            return {...state, error: null}
        }
        default:
            return state;
    }
}

export const actions = {
    addContact(payload: Array<ItemPhoneType>) {
        return ({type: 'ADD_CONTACT', payload} as const)
    },
    deleteContact(payload: number | string) {
        return ({type: 'DELETE_CONTACT', payload} as const)
    },
    filterContact(payload: string) {
        return ({type: 'FILTER_CONTACT', payload} as const)
    },
    throwError(payload: string) {
        return ({type: 'THROW_ERROR', payload} as const)
    },
    resetError(){
        return({type: 'RESET_ERROR'} as const)
    }

}

export const getDataContact = (): ThunkType => {
    let error = ''
    return (
        async (dispatch) => {
            try {
                const response = await fetch(CONTACTS_URL)
                if (!response.ok) {
                    dispatch(actions.throwError('Response is not OK'))
                    error = 'Response is not OK'
                    throw new Error('Response is not OK')
                }
                const responseData = await response.json()
                dispatch(actions.addContact(responseData))

            } catch (e) {
                error = e
                dispatch(actions.throwError(e || 'Response is not OK'))
            }
            finally {
                if (error){
                    error = ''
                    dispatch(actions.resetError())
                }
            }
        }
    )
}
export const postContact = (data: ContactType): ThunkType => {
    let error = ''
    return (
        async (dispatch) => {
            try {
                const response = await fetch(CONTACTS_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                if (!response.ok) {
                    dispatch(actions.throwError('Response is not OK'))
                    error = 'Response is not OK'
                    throw new Error('Response is not OK')
                }
                dispatch(getDataContact())

            } catch (e) {
                error = e
                dispatch(actions.throwError(e))
            }
            if (error){
                error = ''
                dispatch(actions.resetError())
            }
        }
    )
}


export const deletePost = (id: string | number):ThunkType=> {
    let error = ''
    return async (dispatch) => {
        try {
            const response =  await fetch(CONTACTS_URL + id, {
                method: 'DELETE',
            })
            if (!response.ok) {
                dispatch(actions.throwError('Response is not OK'))
                error = 'Response is not OK'
                throw new Error('Response is not OK')
            }
            dispatch(getDataContact())

        }catch (e) {
            error = e
            dispatch(actions.throwError(e))
        }
        if (error){
            error = ''
            dispatch(actions.resetError())
        }
    }
}




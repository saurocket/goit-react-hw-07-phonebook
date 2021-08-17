import React, {useEffect, useMemo, useState} from 'react'
import {Header} from "./Header/Header";
import {Form} from "./From/From";
import {ContactsPage} from './ContacstPage/ContactsPage';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {actions, deletePost, getDataContact,postContact} from "../redux/phoneReducer";
import {getContacts, getError, getFilter} from "../redux/phoneSelectors/phoneSelectors";
import Swal from 'sweetalert2'

export type ContactType = {
    id: string | number,
    name: string,
    number: string,
}


export type IState = {
    name: string
    number: string
}

export const MainPage = () => {
    const dispatch = useDispatch()
    const contacts = useSelector((state: AppStateType) => getContacts(state))
    const filter = useSelector((state: AppStateType) => getFilter(state))
    const error = useSelector((state:AppStateType) => getError(state))

    const [state, setState] = useState<IState>({
        name: '',
        number: ''
    })
    useEffect(() => {
        dispatch(getDataContact())
    },[])

    useMemo(() => {
        if (error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    },[error])

    const onChangeName = (value: string) => {
        setState(prevState => {
            return {...prevState, name: value}
        })
    }
    const onChangePhone = (value: string) => {
        setState(preState => {
            return {...preState, number: value}
        })
    }
    const onChangeFilter = (value: string) => {
        dispatch(actions.filterContact(value))
    }
    const onSubmitForm =  (data: ContactType) => {
        dispatch(postContact(data))

    }
    const onDeleteContact = (id: string | number) => {
        dispatch(deletePost(id))

    }
    const onCheckContactList = (name: string) => {
        return (contacts.find(item => item.name === name))
    }

    return (
        <>
            <Header text='PhoneBook'/>
            <Form
                onCheckContactList={onCheckContactList}
                onSubmitForm={onSubmitForm}
                name={state.name}
                phone={state.number}
                onChangeName={onChangeName}
                onChangePhone={onChangePhone}
            />
            <ContactsPage
                onChangeFilter={onChangeFilter}
                contacts={contacts}
                onDeleteContact={onDeleteContact}
                filter={filter}
            />
        </>
    )

}
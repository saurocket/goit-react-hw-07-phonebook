import React, {useMemo} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {ContactType} from "../MainPage";
import {filterContact} from "../../redux/phoneSelectors/phoneSelectors";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto'

        },
    }),
);

type PropsTypes = {
    filter: string
    contacts: Array<ContactType>
    onDeleteContact: (id: string | number) => void
}

const contactsRender = (contacts:Array<ContactType>, filter:string,
                        filtredContacts: Array<ContactType>):Array<ContactType> => {
    if (filter) {
        return filtredContacts
    }
    return contacts
}



export const Contacts: React.FC<PropsTypes> = ({contacts, filter, onDeleteContact}) => {
    const classes = useStyles();
    const filtredContacts = useSelector((state:AppStateType) => filterContact(state))
    // const contactsRender = (function (constants, filter) {
    //     if (filter) {
    //         return filtredContacts
    //         // return contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    //
    //     }
    //     return contacts
    // })(contacts, filter)


    const updateFilter = useMemo(()=>{
        return contactsRender(contacts,filter, filtredContacts)
    },[contacts,filter,filtredContacts])


    return (
        <div className={classes.root}>
            <List>
                {contactsRender.length > 0 && updateFilter.map(item => <ListItem key={item.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountCircleIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.name}
                                secondary={item.number}
                            />
                            <ListItemSecondaryAction>

                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => onDeleteContact(item.id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
            </List>
        </div>
    );
}
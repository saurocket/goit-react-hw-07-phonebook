import {Header} from "../Header/Header";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { Contacts } from "./Contacts";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            '& > *': {
                marginLeft: 'auto',
                marginRight: 'auto',
                margin: theme.spacing(1),
                width: '50ch',
            },
        },

    }),
);

type PropsTypes = {
    filter: string
    onChangeFilter: (value:string) => void
    contacts: any
    onDeleteContact: (id: string | number) => void

}



export const ContactsPage:React.FC<PropsTypes> = ({filter, onChangeFilter, contacts, onDeleteContact}) => {
    const classes = useStyles();
    return <>
        <Header
            text="Contacts"
            variant='h3'
        />
        <div className={classes.root}>
            <TextField
                id="filter"
                label="Find contacts by name"
                variant="outlined"
                value={filter}
                onChange={(e)=> onChangeFilter(e.target.value)}
            />
        </div>
        <Contacts
            contacts={contacts}
            filter={filter}
            onDeleteContact={onDeleteContact}
        />
    </>
}
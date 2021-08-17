import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {PrimaryButton} from "./Button"
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "./Input";
import {ContactType} from "../MainPage";
import Swal from "sweetalert2";

type PropsType = {
    name: string,
    phone: string,
    onChangeName: (value: string) => void
    onChangePhone: (value: string) => void
    onSubmitForm: (data: ContactType) => void
    onCheckContactList: (name: string) => undefined | any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            '& > *': {
                marginLeft: 'auto',
                marginRight: 'auto',
                margin: theme.spacing(1),
                width: '50ch',
            },
        },

    }),
);

const schema = yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п.")
        .required("Имя - Обязательное поле"),
    phone: yup
        .string()
        .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, "Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +")
        .required("Номер телефона - Обязательное поле")
})


export const Form: React.FC<PropsType> = ({name, phone, onChangeName, onChangePhone, onSubmitForm, onCheckContactList}) => {


    const classes = useStyles();
    const onSubmit = (data: { name: string, phone: string }) => {
        const matchContact = onCheckContactList(name)
        if (matchContact){
            Swal.fire(`${name}`, "<p>Уже есть в ваших контактах</p>")
            return
        }
        const id = 'id-' + Date.now()
        onSubmitForm({id: id, number: data.phone, name: data.name})


        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${name} Добавлен(a) в ваши контакты `,
            showConfirmButton: false,
            timer: 1500
        })
        onChangeName('')
        onChangePhone('')

    }

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {name, phone},
        mode: "onBlur",
        resolver: yupResolver(schema)

    })


    return (
        <form className={classes.root}  onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('name')}
                id="name"
                type="text"
                label="Name"
                error={!!errors.name}
                helperText={errors?.name?.message}
                value={name}
                onChange={(e: any) => onChangeName(e.target.value)}
            />
            <Input
                {...register('phone')}
                id="phone"
                type="text"
                label="Phone"
                error={!!errors.phone}
                helperText={errors?.phone?.message}
                value={phone}
                onChange={(e: any) => onChangePhone(e.target.value)}
            />
            <PrimaryButton>Add contact</PrimaryButton>
        </form>
    );
}

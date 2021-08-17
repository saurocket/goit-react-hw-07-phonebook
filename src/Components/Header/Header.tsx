import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => createStyles({
    header: {
        padding: theme.spacing(5)
    }
}))

type PropsTypes = {
    text: string
    variant?: 'h2' | 'h3'
}

export const Header:React.FC<PropsTypes> = ({text,variant='h2'}) => {
    const clasess = useStyles()
    return (
        <Typography
            className={clasess.header}
            variant={variant}
            component={variant}
            gutterBottom
            color="primary"
            align="center"
        >
            {text}
        </Typography>
    )
}

import {forwardRef} from "react";
import {TextField} from "@material-ui/core";

export const Input = forwardRef((props:any, ref:any) => {

    return (
        <TextField
            variant="outlined"
            margin='normal'
            inputRef={ref}
            fullWidth
            {...props}
        />
    )


})

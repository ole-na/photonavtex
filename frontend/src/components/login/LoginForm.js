import React, {useContext, useState} from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import {InputAdornment, TextField} from "@material-ui/core";
import TypeAndAuthContext from "../login/context/TypeAndAuthContext";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    formControl: {
        width: '100%',
    },
    textField: {
        minWidth: '215px',
        maxWidth: '300px',
        paddingLeft: '0px',
        marginBottom: '1.5em',
    },
}))

export default function LoginForm(props) {
    const classes = useStyles()

    const [error, setError] = useState()
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    const {login} = useContext(TypeAndAuthContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        login(credentials)
    }

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setCredentials({ ...credentials, [event.target.name]: event.target.value})
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <section className="margin-bottom-l">
            <p>I'm already registered</p>
            <form onSubmit={(event) => {handleSubmit(event)}}>
                <FormControl className={classes.formControl}>
                    <FormGroup className={classes.formContainer}>
                        <TextField name="username" id="username"
                                   required={props.required}
                                   label="Username"
                                   defaultValue={credentials.username}
                                   placeholder="Username"
                                   error={error}
                                   helperText="Please insert your username"
                                   variant="outlined"
                                   className={classes.textField}
                                   onChange={handleChange('username')}
                        />
                            <TextField name="password" id="password"
                                       required={props.required}
                                       label="Password"
                                       type={values.showPassword ? 'username' : 'password'}
                                       defaultValue={values.password}
                                       placeholder="Password"
                                       error={error}
                                       helperText="Please insert your password"
                                       variant="outlined"
                                       className={classes.textField}
                                       onChange={handleChange('password')}
                                       InputProps={{
                                           endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                            />
                    </FormGroup>
                </FormControl>
                <Button variant="contained"
                        color="primary"
                        type="submit"
                        disabled={credentials.password === "" || credentials.username === ""}
                >Login</Button>
            </form>
        </section>
    )
}

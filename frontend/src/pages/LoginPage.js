import LoginForm from "../components/login/LoginForm";
import React from "react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="page-content-container">
            <h2>Login or Register</h2>
            <LoginForm />
            <Divider />
            <section>
                <p>I'm not registered yet.</p>
                <Button component={Link} to="/signup" variant="contained" color="secondary" >
                    Register
                </Button>
            </section>
        </div>
    );
}
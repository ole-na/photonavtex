import React from "react";
import SignupForm from "../components/login/LoginForm";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export default function SignupPage() {
    return (
        <div className="page-content-container">
            <h2>Register</h2>
            <SignupForm />
            <Divider />
            <section>
                <p>Already have an account?</p>
                <Button component={Link} to="/login" variant="contained" color="secondary">
                    Login
                </Button>
            </section>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
// bring data from user.model through the auth.routes 
function Login() {
    return (<>
        <LoginForm />
    </>)
}

export default Login;
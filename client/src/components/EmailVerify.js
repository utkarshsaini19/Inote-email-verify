import React, { useState, useEffect, Fragment } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'



const EmailVerify = (props) => {
    const [validUrl, setvalidUrl] = useState(false)
    const [text, setText] = useState("")
    const param = useParams();
    const usenavigate = useNavigate();

    const verifyEmail = async (e) => {
        console.log("Inside verify mail");
        try {
            
            const response = await fetch(`/api/auth/users/${param.id}/verify/${param.token}`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.message === "Email Verified Successfully")
            {
                setvalidUrl(true);
                props.showAlert("Registered SuccessFully", "success");
                usenavigate('/login')

            }
        } catch (error) {
            console.log(error.message);
            setvalidUrl(false);
            // props.showAlert("Link Broken", "danger")
        }
    }

    useEffect(() => {
        verifyEmail();
    }, [])

    return (
        <>
            {validUrl || <h1>Link Broken ...</h1>}
        </>
    )
}


export default EmailVerify
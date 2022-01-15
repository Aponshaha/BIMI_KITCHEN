import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useSearchParams } from "react-router-dom";

export default function EmailVerification() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);

    let [body, setBody] = useState("");

    async function getEmailVerification(token) {
        const response = await fetch(`/api/users/verify?token=${token}`);
        return response;
    }

    useEffect(async () => {
        setLoading(true);
        const response = await getEmailVerification(searchParams.get('token'));
        if(response.status === 200) {
            setBody(<p>Account Verified. Please Login to your account.</p>);
        } else {
            setBody(<p>Account Verification failed.</p>);
        }
        setLoading(false);
    }, []);

    return (
        <div>
            {loading ? <Loading /> : body}
        </div>
    );
}
import React from "react";
import Api from "../../Api";
import "./Login.css";

export default ({ onReceive }) => {

    const handleFacebookLogin = async () => {
        let result = await Api.fbPopup();
        if (result) {
            console.log(result.user)
            onReceive(result.user);
        } else {
            alert('Erro!');
        }
    }

    return (
        <div className="login">
            <div className="login-options">
                <div className="login-title">Faça o seu Login</div>
                <div className="btn face-btn" onClick={handleFacebookLogin}>
                    Logar com o Facebook
                </div>
                <div className="btn google-btn">
                    Logar com o Google
                </div>
                <div className="btn github-btn">
                    Logar com o GitHub
                </div>
            </div>
        </div>
    );
}
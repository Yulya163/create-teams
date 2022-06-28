import { Component } from "react";

class Registration extends Component {

    render() {
        return (
            <div className="login-block">
                <input 
                    className="name"
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onInput={handleInputLogin}                    
                />
                <input 
                    className="password"
                    type="password"
                    placeholder="Enter your password"
                    value={userName}
                    onInput={handleInputLogin}                    
                />
                <button
                    className="login-btn"
                    onClick={checkResponse}
                >Login</button>
            </div>
        )
    }
}

export { Registration }
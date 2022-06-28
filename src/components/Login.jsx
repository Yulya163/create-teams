

function Login(props) {
    const {
        login, 
        password, 
        handleInputLogin, 
        handleInputPassword, 
        checkResponse, 
        isMessage,
        onRegisterClick,
        isAuthorization,        
        onEnterClick,
        setUser,
        showMessage,
        message
    } = props;    

    const showPassword = (evt) => {        
        if (evt.target.checked) {          
            document.querySelector('.password').setAttribute('type', 'text');
            document.querySelector('.pass-img').src = "../eye-open.png";
        } else {
            document.querySelector('.password').setAttribute('type', 'password');
            document.querySelector('.pass-img').src = "../eye-close.png";
        }   
    }
    const checkLogin = (evt) => { 
        const MAX_VALUE_LENGTH = 10;       
        const MIN_VALUE_LENGTH = 3;   
         
        const valueLength = evt.target.value.length;

        if (valueLength < MIN_VALUE_LENGTH) {            
            evt.target.setCustomValidity(`add ${MIN_VALUE_LENGTH - valueLength} characters`)
        } else if (valueLength > MAX_VALUE_LENGTH) {            
            evt.target.setCustomValidity(`extra ${valueLength - MAX_VALUE_LENGTH} characters`)
        } else {
            evt.target.setCustomValidity('')
        }
        evt.target.reportValidity();        
    }

    return (
           
        <form className="login-block auth" noValidate aria-live="polite">
            {
                isAuthorization ?
                <h3 className="title">Sign in</h3> :
                <h3 className="title">Sign up</h3>
            }
            <input 
                className="name"
                type="text"
                placeholder="Login"
                value={login}                
                onInput={(evt) => {
                    handleInputLogin(evt);
                    checkLogin(evt);
                }}                   
            />
            <div className="password-block">
                <input 
                    className="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onInput={handleInputPassword}
                />
                <label>
                    <input 
                        type="checkbox"
                        onClick={showPassword}
                    />
                    <img src="../eye-close.png" className="pass-img" alt="eye-close"/>
                </label>
            </div>
            {
                isAuthorization ? 
                <>
                    {
                        isMessage ? showMessage(message) : null
                    }
                    <button
                        className="login-btn"
                        onClick={(evt) => {
                            evt.preventDefault();                            
                            checkResponse(login, password)
                        }}
                    >Sign in</button>
                    <button 
                        className="registr-btn"
                        onClick={(evt) => {
                                evt.preventDefault();
                                onRegisterClick(evt);
                            }
                        }        
                    >Sign up</button>
                </> :
                <>
                    {
                        isMessage ? showMessage(message) : null
                    }
                    <button 
                        className="registr-btn"
                        onClick={(evt) => {
                                evt.preventDefault();
                                setUser();                                
                            }
                        }        
                    >Sign up</button>
                    <button
                        className="login-btn"
                        onClick={(evt) => {
                            evt.preventDefault();
                            onEnterClick(evt);                            
                        }}
                    >Sign in</button>
                </>

            }
        </form>  
      
    )
}
export { Login }
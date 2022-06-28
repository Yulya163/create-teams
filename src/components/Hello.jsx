export default function Hello(props) {
    const { login, logOut } = props;    
    return (
        <div className="greeting">
            <div className="title">Hello, {login} !</div>
            <div 
                className="exit-btn"
                onClick={logOut}
            >
            Exit
            </div>           
        </div>
    )
}
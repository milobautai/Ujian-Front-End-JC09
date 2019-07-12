export const OnRegisterSuccess = (data) => {
    return{
        type : 'LOGIN_SUCCESS',
        payload : data
    }
}

export const onLogout = () => {
    return{
        type : 'LOG_OUT'
    }
}
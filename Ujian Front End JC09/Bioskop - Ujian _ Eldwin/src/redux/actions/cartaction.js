import Axios from "axios";
import { ApiUrl } from "/Users/Eldwin/Documents/Purwadhika/Front end/bioskop-pwd-master2/src/supports/ApiURl";

export const cartCount = (int) => {
    return (dispatch) => {
        Axios.get(ApiUrl + '/users?username=' + int).then((res)=>{
            Axios.get(ApiUrl + '/cart?idUser=' + res.data[0].id).then((res) => {
                dispatch({
                    type : 'CART_COUNT',
                    payload : res.data.length
                })
            })
        })
    }
}

export const resetCount = () => {
    return{
        type : 'RESET_COUNT'
    }
}
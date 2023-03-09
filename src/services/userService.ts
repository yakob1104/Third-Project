import axios from "axios";
import User from "../interfaces/User";


const api: string = process.env.REACT_APP_API + "/users" || "" ;

export function checkUser(userToCheck: User) {
    return axios.get(
        `${api}?email=${userToCheck.email}&password=${userToCheck.password}`
    );
}


export function addUser(userToAdd: User) {
    return axios.post(api, userToAdd);
}
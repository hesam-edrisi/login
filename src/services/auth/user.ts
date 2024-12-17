import axios from "axios"
import axiosInstance from "../../axios"

export const Getuser = ()=>{
    return axiosInstance.get("/User/GetUserInfo")
}
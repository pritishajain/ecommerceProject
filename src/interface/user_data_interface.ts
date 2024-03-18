import { IinfoDataType } from "./data_interface";

export interface IuserInfo{
    email: string,
    fullName: string,
    cart: IinfoDataType[],
    wishList:IinfoDataType[],
    orderHistory:IinfoDataType[]
}

export interface Iauthuser{
    token: string,
    user: {
        name:string,
        email:string
    },
    isAdmin: boolean
}
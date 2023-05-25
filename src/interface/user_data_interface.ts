import { IinfoDataType } from "./data_interface";

export interface IuserInfo{
    email: string,
    fullName: string,
    cart: IinfoDataType[],
    wishList:IinfoDataType[],
    orderHistory:IinfoDataType[]
}
import { IAuthServiceLoginParams, IBasicLoginParams } from "../interfaces";

export interface IAuthService {
    login(data:IAuthServiceLoginParams):Promise<any>;
    basicLogin(data:IBasicLoginParams):Promise<any>;
    setAccessToken(accessToken:string):Promise<any>;
}
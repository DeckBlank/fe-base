import { IAuthServiceLoginParams } from "../interfaces";

export interface IAuthService {
    login(data:IAuthServiceLoginParams):Promise<any>;
}
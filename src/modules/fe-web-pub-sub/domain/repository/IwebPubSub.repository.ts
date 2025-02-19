import {IWebPubSubUrl, ResponseAPI} from "../entities";

export interface IwebPubSubRepository {
    getWebPubSubUrl(): Promise<ResponseAPI<IWebPubSubUrl>>
}
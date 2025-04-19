import { IWebPubSubUrl } from "../entities/IWebPubSubUrl";
import { ResponseAPI } from "../entities/ResponseAPI";

export interface IwebPubSubRepository {
    getWebPubSubUrl(): Promise<ResponseAPI<IWebPubSubUrl>>
}
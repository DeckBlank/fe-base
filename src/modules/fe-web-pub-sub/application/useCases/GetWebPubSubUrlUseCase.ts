import { IwebPubSubRepository } from '@fe-web-pub-sub/domain/repository';

export class GetWebPubSubUrlUseCase {
  constructor(private webPubSubRepository: IwebPubSubRepository) {}

  async execute() {
    return this.webPubSubRepository.getWebPubSubUrl();
  }
}

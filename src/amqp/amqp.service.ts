import { AmqpManager } from './amqp.manager.service';
import { ChannelType, ChannelWithConfig } from './amqp.types';

export class AmqpService {
  private amqpPayment = AmqpManager.getInstance();
  private channelWithConfig: ChannelWithConfig;
  protected async getChannelWithConfig(channelType: ChannelType) {
    if (!this.channelWithConfig)
      this.channelWithConfig = await this.amqpPayment.getChannelWithConfig(
        channelType
      );
    return this.channelWithConfig;
  }
}

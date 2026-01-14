import { postHostMessage } from '@tt/plugin-sdk';

export interface DemoGreetingMessage {
  /** 插件 ID */
  pluginId: string;
  /** 消息类型 */
  type: string;
  /** 消息数据 */
  data: {
    /** 文本内容 */
    message: string;
  };
}

/** 发送问候消息到宿主 */
export function sendGreetingMessage(message: string) {
  const payload: DemoGreetingMessage = {
    pluginId: 'tt-plugin-demo',
    type: 'greeting',
    data: { message }
  };
  postHostMessage(payload);
  console.info('[plugin-demo] message sent:', payload);
}

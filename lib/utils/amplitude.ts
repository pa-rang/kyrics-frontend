import { AmplitudeClient } from 'amplitude-js';

import { isProduction, isServer } from '../constants/env';

export type LoggerEventParams = {
  [key: string]: string | boolean | number | undefined;
};

export interface LoggerParams {
  view: string;
  action: string;
  params?: LoggerEventParams;
}

let amplitudeClient: AmplitudeClient | null = null;

export const initializeAmplitude = async () => {
  if (isServer) return null;

  try {
    const amplitudeModule = await import('amplitude-js');

    amplitudeClient = amplitudeModule.getInstance();

    return amplitudeClient.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '');
  } catch {
    return null;
  }
};

const track = (logName: string, { view, action, params }: LoggerParams) => {
  if (!isProduction) {
    // eslint-disable-next-line no-console
    console.table({
      view,
      logName,
      action,
      ...params,
    });
  }

  amplitudeClient?.logEvent(logName, {
    view,
    action,
    ...params,
  });
};

const getView =
  (loggerName: string) =>
  (params: LoggerEventParams = {}) =>
    track(`${loggerName}_view`, {
      view: loggerName,
      action: 'view',
      params,
    });

const getClick =
  (loggerName: string) =>
  (logName: string, params: LoggerEventParams = {}) =>
    track(logName, {
      view: loggerName,
      action: 'click',
      params,
    });

export const getPageLogger = (loggerName: string) => ({
  /** 페이지 진입점에서 사용 */
  view: getView(loggerName),
  /** 특정 요소 클릭 시 사용 */
  click: getClick(loggerName),
});

import { message } from 'antd';
import i18n from '@/i18n';

const t = i18n.t;

export const showMessage = (status: number | string) => {
    let msg: string = "";
    switch (status) {
        case 400:
            msg = t('message.status-400');
            break;
        case 401:
            msg = t('message.status-401');
            break;
        case 403:
            msg = t('message.status-403');
            break;
        case 404:
            msg = t('message.status-404');
            break;
        case 408:
            msg = t('message.status-408');
            break;
        case 500:
            msg = t('message.status-500');
            break;
        case 501:
            msg = t('message.status-501');
            break;
        case 502:
            msg = t('message.status-502');
            break;
        case 503:
            msg = t('message.status-503');
            break;
        case 504:
            msg = t('message.status-504');
            break;
        case 505:
            msg = "HTTP版本不受支持(505)";
            break;
        default:
            msg = t('message.status-default');
    }
    // return `${message}，请检查网络或联系管理员！`;
    message.error('${message}');
};

import type { ReactNode } from 'react';
import {
  SESSION_STORAGE_KEYS,
  type LoadErrorReason,
  type ToastType,
} from '../../types/base';
import { toast } from 'react-toastify';
import { getRetryFailedMessage } from '../../utils/responseMessage';

const retryFailedToastId = 'retry-failed';

export function notify(message: ReactNode, type: ToastType) {
  toast(message, { type });
}

export function notifyRetryFailed() {
  const message = getRetryFailedMessage();

  if (toast.isActive(retryFailedToastId)) {
    toast.update(retryFailedToastId, {
      render: message,
      type: 'error',
      autoClose: 5000,
    });
    return;
  }

  toast(message, {
    type: 'error',
    toastId: retryFailedToastId,
  });
}

export function getLoadError(): LoadErrorReason | null {
  const stored = sessionStorage.getItem(SESSION_STORAGE_KEYS.loadError);
  if (stored === 'fetch' || stored === 'schema') return stored;
  return null;
}

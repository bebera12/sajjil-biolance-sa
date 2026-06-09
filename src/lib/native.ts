// Lightweight wrappers around Capacitor plugins.
// Safe to call from web — no-op when not running inside the native shell.
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const isNative = () => Capacitor.isNativePlatform();

export const tapFeedback = async () => {
  if (!isNative()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    /* ignore */
  }
};

export const successFeedback = async () => {
  if (!isNative()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch {
    /* ignore */
  }
};

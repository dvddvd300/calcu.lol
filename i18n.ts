import {getRequestConfig} from 'next-intl/server';
import {routing} from './i18n/routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Validate that the incoming `locale` parameter is valid
  const locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  // Load all namespace files for the locale
  const namespaces = [
    'common',
    'home', 
    'speedCalc',
    'percentageCalc',
    'tipCalc',
    'storageCalc',
    'calculators',
    'ageCalc',
    'dateCalc',
    'timeCalc',
    'distanceConverter',
    'weightConverter',
    'temperatureConverter',
    'speedConverter',
    'timezoneConverter',
    'workHoursCalc',
    'countdownTimer'
  ];

  const messages = {};
  
  for (const namespace of namespaces) {
    try {
      const namespaceData = (await import(`./i18n/messages/${locale}/${namespace}.json`)).default;
      Object.assign(messages, namespaceData);
    } catch (error) {
      console.warn(`Failed to load namespace ${namespace} for locale ${locale}, falling back to English:`, error instanceof Error ? error.message : String(error));
      try {
        // Fallback to English version
        const namespaceData = (await import(`./i18n/messages/en/${namespace}.json`)).default;
        Object.assign(messages, namespaceData);
      } catch (fallbackError) {
        console.error(`Failed to load English fallback for namespace ${namespace}:`, fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
      }
    }
  }

  return {
    locale,
    messages
  };
});

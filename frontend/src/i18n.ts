import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Detect locale from browser or default to 'en'
  let locale = 'en';
  if (acceptLanguage.includes('ar')) {
    locale = 'ar';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

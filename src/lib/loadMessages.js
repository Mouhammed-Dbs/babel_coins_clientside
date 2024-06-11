import deepmerge from "deepmerge";

export async function loadMessages(locale) {
  const defaultMessages = await import(`../../messages/en.json`);
  let localeMessages = {};

  try {
    localeMessages = await import(`../../messages/${locale}.json`);
  } catch (error) {
    console.warn(
      `Could not load messages for locale: ${locale}. Falling back to default messages.`
    );
  }

  return deepmerge(defaultMessages, localeMessages);
}

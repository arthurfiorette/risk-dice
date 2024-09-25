function replaceSlashes(url?: string) {
  if (!url) {
    return undefined;
  }

  if (url.startsWith('/')) {
    url = url.replace('/', '');
  }

  if (url.endsWith('/')) {
    url = url.replace('/', '');
  }

  return url;
}

const basePath = replaceSlashes(process.env.BASE_PATH) || 'risk-dice';
const domain = replaceSlashes(process.env.BASE_URL) || 'https://localhost:4321';

export const PUBLIC_URL = new URL(basePath, domain);

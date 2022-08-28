const config = {
  apiUrl: 'https://quickavail.pro',
}
export default config

export function api(route) {
  return `${config.apiUrl}/${route}`
}

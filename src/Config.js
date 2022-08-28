const config = {
  apiUrl: 'https://us-central1-email-avail.cloudfunctions.net',
}
export default config

export function api(route) {
  return `${config}/${route}`
}

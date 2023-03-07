export default async function mockFetch(url: string) {
  switch (url) {
    case '':
    default: {
      throw new Error(`Unhandled request: ${url}`)
    }
  }
}

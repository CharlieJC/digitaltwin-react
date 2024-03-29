class Twin {
  id: string
  code: number
  ownerId: string

  constructor({ id, code, ownerId }: { id: string; code: number; ownerId: string }) {
    this.id = id
    this.code = code
    this.ownerId = ownerId
  }
}

const fetchTwins = async (auth_token: string, ownerId: string): Promise<Twin[]> => {
  const params = new URLSearchParams({
    secret_token: auth_token,
  })
  return fetch(`${process.env.REACT_APP_API_HOST}api/twin/allByOwner?${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      id: ownerId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const twins: Twin[] = []

      data.twins.forEach((twin: Twin) => {
        twins.push(twin)
      })
      return twins
    })
}

const createTwin = async (auth_token: string, ownerId: string): Promise<Twin | undefined> => {
  const params = new URLSearchParams({
    secret_token: auth_token,
  })
  return fetch(`${process.env.REACT_APP_API_HOST}api/twin/?${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      ownerId,
    }),
  })
    .then((res) => res.json())
    .then((data) => data.twin)
}

const deleteTwin = async (auth_token: string, twinId: string): Promise<Twin | undefined> => {
  const params = new URLSearchParams({
    secret_token: auth_token,
  })
  return fetch(`${process.env.REACT_APP_API_HOST}api/twin/delete?${params}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      id: twinId,
    }),
  })
    .then((res) => res.json())
    .then((twin: Twin) => twin)
}

const verifyCode = async (code: number): Promise<Twin | undefined> =>
  fetch(`${process.env.REACT_APP_API_HOST}api/twin/validcode`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code: String(code),
    }),
  })
    .then((res) => res.json())
    .then((data) => data.twin)
export { Twin, fetchTwins, createTwin, deleteTwin, verifyCode }

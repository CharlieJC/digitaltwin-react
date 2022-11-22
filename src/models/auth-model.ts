class User {
  id: string
  email: string
  username: string

  constructor({ id, email, username }: { id: string; email: string; username: string }) {
    this.id = id
    this.email = email
    this.username = username
  }
}

type TokenUserResponse = {
  token: string
  user: User
}
const loginUser = async (email: string, password: string): Promise<TokenUserResponse> =>
  fetch(`${process.env.REACT_APP_API_HOST}api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const response: TokenUserResponse = { token: data.token, user: data.user }
      return response
    })

const registerUser = async (
  email: string,
  username: string,
  password: string,
): Promise<User | undefined> =>
  fetch(`${process.env.REACT_APP_API_HOST}api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      email,
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data.user)

const verifyToken = async (auth_token: string): Promise<User | undefined> => {
  const params = new URLSearchParams({
    secret_token: auth_token,
  })
  return fetch(`${process.env.REACT_APP_API_HOST}api/auth/isAuth?${params}`)
    .then((res) => res.json())
    .then((data) => data.user)
}

export { User, loginUser, registerUser, verifyToken }

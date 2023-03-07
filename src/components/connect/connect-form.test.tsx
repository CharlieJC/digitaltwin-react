import { fireEvent, render, screen } from '@testing-library/react'
import ConnectForm from './connect-form'

const handleConnect = jest.fn()
beforeAll(() => {})

beforeEach(() => {})

test('handleConnect is called on submit', () => {
  render(<ConnectForm handleConnect={handleConnect} />)
  fireEvent.submit(screen.getByText('Connect'))
  expect(handleConnect).toBeCalled()
})

// https://betterprogramming.pub/using-jest-mocks-typescript-the-right-way-da025da7a284

// https://blog.fildon.me/mocking-in-jest-with-typescript-and-react

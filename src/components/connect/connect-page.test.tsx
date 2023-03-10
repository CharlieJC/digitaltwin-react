import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import ConnectPage from './connect-page'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHref: () => mockedUsedNavigate,
}))

test('redirect to sign in page on sign in link click', () => {
  render(
    <Router>
      <ConnectPage />
    </Router>,
  )
  fireEvent.click(screen.getByText('Sign in here'))
  expect(mockedUsedNavigate).toBeCalled()
})

const baseURL = 'https://cash-flow-api.zeabur.app/api'
// const baseURL = 'http://localhost:3000/api'

function CustomGoogleLoginButton () {
  return (
    <div>
      <a href={`${baseURL}/auth/google`}>Sign in with Google</a>
    </div>
  )
}

export default CustomGoogleLoginButton

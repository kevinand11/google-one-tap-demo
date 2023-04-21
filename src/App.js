import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import './App.css'
import logo from './logo.svg'

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

   const onOneTapSignedIn = (response) => {
       setIsSignedIn(true)
       const decodedToken = jwt_decode(response.credential)
       setUserInfo({...decodedToken})
   }

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = async () => {
            await new Promise((res) => setTimeout(res, 3000))
            window.google.accounts.id.initialize({
                client_id: '1060370867985-mfuqgg0kkhpsbq4s1r80p39erben4i1k.apps.googleusercontent.com',
                callback: onOneTapSignedIn
            })
            window.google.accounts.id.prompt(notification => {
                if (notification.isNotDisplayed()) {
                    console.log(notification.getNotDisplayedReason())
                } else if (notification.isSkippedMoment()) {
                    console.log(notification.getSkippedReason())
                } else if (notification.isDismissedMoment()) {
                    console.log(notification.getDismissedReason())
                }
            })
        }
        script.async = true
        document.querySelector('body').appendChild(script)
     }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                 { isSignedIn ?
                   <div>Hello {userInfo.name} ({userInfo.email})</div> :
                   <div>You are not signed in</div>
               }
            </header>
        </div>
    )
}

export default App

import '../styles/globals.css'
import firebase, {FirebaseContext} from "../firebase/";


function MyApp({Component, pageProps}) {
    return (
        <FirebaseContext.Provider value={{firebase}}>
            <Component {...pageProps}  />
        </FirebaseContext.Provider>
    )
}

export default MyApp

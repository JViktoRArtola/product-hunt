import '../styles/globals.css'
import firebase, {FirebaseContext} from "../firebase/";
import useAuth from "../hooks/useAuth";

function MyApp({Component, pageProps}) {
    const user = useAuth();
    return (
        <FirebaseContext.Provider value={{firebase, user}}>
            <Component {...pageProps}  />
        </FirebaseContext.Provider>
    )
}

export default MyApp

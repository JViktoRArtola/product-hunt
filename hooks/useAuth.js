import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

function useAuth() {
    const [ user, setUser] = useState(null);

    useEffect(() => {
        const unSubscribe = firebase.auth.onAuthStateChanged(user => {
            if( user ) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unSubscribe();
    }, []);

    return user;
}
export default useAuth;

import {
    GoogleAuthProvider,
    User,
    UserCredential,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { createContext, useState, ReactNode, useEffect } from "react";
import { auth as firebaseAuth } from "./firebase";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext<IContextValues | undefined>(undefined);

export interface IContextValues {
    auth: User | null;
    handleSignIn: () => void;
    handleSignOut: () => void;
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<User | null>(null);

    const handleSignIn = async () => {
        const user: UserCredential = await signInWithPopup(
            firebaseAuth,
            provider
        );
        setAuth(user.user);
    };

    const handleSignOut = async () => {
        await signOut(firebaseAuth);
        setAuth(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setAuth(user);
            } else {
                setAuth(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authValues: IContextValues = {
        auth,
        handleSignIn,
        handleSignOut,
    };

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};

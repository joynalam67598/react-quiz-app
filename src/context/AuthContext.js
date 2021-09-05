import React from 'react';
import '../firebase'
import {
	getAuth, createUserWithEmailAndPassword,
	signInWithEmailAndPassword, signOut,
	updateProfile,onAuthStateChanged
} from 'firebase/auth'

const AuthContext = React.createContext();

export function useAuth() {
	return React.useContext(AuthContext);
}

export function AuthProvider({children}) {
	const [loading, setLoading] = React.useState(true);
	const [currentUser, setCurrentUser] = React.useState();

	React.useEffect(()=>{
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth,(user)=>{
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	},[]);

	//signup function
	async function signUp(email, password, username) {
		const auth = getAuth();
		await createUserWithEmailAndPassword();

		// update profile
		await updateProfile(auth.currentUser, {display: username});

		const user = auth.currentUser;

		setCurrentUser({
			...user
		});
	}

	function login(email, password) {
		const auth = getAuth();
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout(email, password) {
		const auth = getAuth();
		return signOut(auth);
	}

	const value = {
		currentUser, signUp, login, logout
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

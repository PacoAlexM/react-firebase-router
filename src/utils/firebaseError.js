export const firebaseErrors = (code) => {
    switch (code) {
        case 'auth/email-already-in-use':
            return 'This email is already in use'
        case 'auth/invalid-email':
            return 'This is an invalid email'
        case 'auth/weak-password':
            return 'Password must be at least 6 characters'
        case 'auth/internal-error':
            return 'Internal server error'
        case 'auth/user-not-found':
            return 'This user doesn\'t exist'
        case 'auth/invalid-credential':
            return 'User or password wrong'
        default:
            return 'Internal server error'
    }
}

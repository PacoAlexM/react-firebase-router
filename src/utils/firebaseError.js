export const firebaseErrors = (code) => {
    switch (code) {
        case 'auth/email-already-in-use':
            return {
                code: 'email',
                message: 'This email is already in use'
            }
        case 'auth/invalid-email':
            return {
                code: 'email',
                message: 'This is an invalid email'
            }
        case 'auth/weak-password':
            return {
                code: 'password',
                message: 'Password must be at least 6 characters'
            }
        case 'auth/internal-error':
            return {
                code: 'email',
                message: 'Internal server error'
            }
        case 'auth/user-not-found':
            return {
                code: 'email',
                message: 'This user doesn\'t exist'
            }
        case 'auth/invalid-credential':
            return {
                code: 'email',
                message: 'User or password wrong'
            }
        default:
            return {
                code: 'email',
                message: 'Internal server error'
            }
    }
}

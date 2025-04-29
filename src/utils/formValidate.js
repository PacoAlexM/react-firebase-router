export const formValidate = (getValues) => {
    return {
        required: {
            value: true,
            message: 'This field is required'
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: 'This is an invalid email'
        },
        minLength: {
            value: 6,
            message: 'Your password must be at least 6 characters'
        },
        validateTrim: {
            trim: v => !v.trim() ? 'White spaces only aren\'t allowed' : true
        },
        validateEquals(getValues) {
            return {
                equals: v => v === getValues('password') || 'The password doesn\'t match'
            }
        }
    }
}

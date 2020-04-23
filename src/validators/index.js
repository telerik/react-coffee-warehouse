const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);

export const emailValidator = (value) => (emailRegex.test(value) ? '' : 'You have entered an invalid email address!');
export const requiredValidator = (value) => value ? '' : 'This field is required';
export const phoneValidator = (value) => value && phoneRegex.test(value) ? '' : 'Please enter valid phone number.';
export const biographyValidator = (value) => value && value.length > 50 ? '' : 'Biography must be at least 50 characters long.';
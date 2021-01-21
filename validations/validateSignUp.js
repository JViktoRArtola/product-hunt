export default function validateSignUp(values) {

    let errors = {};

    // Validar el nombre del usuario
    if (!values.name) {
        errors.name = "El Nombre es obligatorio";
    }

    // validar el email
    if (!values.email) {
        errors.email = "El Email es Obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email no válido"
    }

    // validar el password
    if (!values.password) {
        errors.password = "El password es obligatorio";
    } else if (values.password.length < 6) {
        errors.password = 'El password debe ser de al menos 6 caracteres'
    }

    return errors;
}

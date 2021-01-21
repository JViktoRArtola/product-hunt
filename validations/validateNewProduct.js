export default function validateNewProduct(values) {

    let errors = {};

    // Validar el nombre del usuario
    if(!values.name) {
        errors.name = "Name Required";
    }

    // validar empresa
    if(!values.organization) {
        errors.organization = "Organization Name Required"
    }

    // validar la url
    if(!values.url) {
        errors.url = 'URL RequiredURL';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) {
        errors.url = "Is not a valid URL"
    }

    // validar descripción.
    if(!values.description) {
        errors.description = "Description Required"
    }

    return errors;
}

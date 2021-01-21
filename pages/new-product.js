import React, {useState, useContext} from 'react';
import {css} from '@emotion/react';
import {useRouter} from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import {Form, Field, InputSubmit, Error} from '../components/ui/Form';
import {FirebaseContext} from '../firebase';
import Error404 from '../components/layout/404';
import useValidation from '../hooks/useValidation';
import validateNewProduct from '../validations/validateNewProduct';

const INITIAL_STATE = {
    name: '',
    organization: '',
    image: '',
    url: '',
    description: ''
}

const NewProduct = () => {

    // state de las images
    const [imageName, setImageName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [urlImage, setUrlImage] = useState('');

    const [error, setError] = useState(false);

    const {values, errors, handleSubmit, handleChange, handleBlur} = useValidation(INITIAL_STATE, validateNewProduct, createProduct);

    const {name, organization, image, url, description} = values;

    // hook de routing para redireccionar
    const router = useRouter();

    // context con las operaciones crud de firebase
    const {user, firebase} = useContext(FirebaseContext);

    async function createProduct() {

        // si el user no esta autenticado llevar al login
        if (!user) {
            return router.push('/login');
        }

        // crear el objeto de nuevo producto
        const product = {
            name,
            organization,
            url,
            urlImage,
            description,
            votes: 0,
            comments: [],
            created: Date.now(),
            creator: {
                id: user.uid,
                name: user.displayName
            },
            hasVoted: []
        }

        // insertarlo en la base de datos
        firebase.db.collection('products').add(product);

        return router.push('/');

    }


    const handleUploadStart = () => {
        setProgress(0);
        setUploading(true);
    }

    const handleProgress = progress => setProgress({progress});

    const handleUploadError = error => {
        setUploading(error);
        console.error(error);
    };

    const handleUploadSuccess = (filename, task)  => {
        let name2 = task.snapshot.ref._delegate._location.path_
        let usename = name2.split('/')[1]
        console.log('usename', usename)
        setProgress(100);
        setUploading(false);
        setImageName(usename)
        firebase
            .storage
            .ref("products")
            .child(usename)
            .getDownloadURL()
            .then(url => {
                console.log(url);
                setUrlImage(url);
            });
    };

    return (
        <div>
            <Layout>
                {!user ? <Error404/> : (
                    <>
                        <h1
                            css={css`
                text-align: center;
                margin-top: 5rem;
              `}
                        >Add Product</h1>
                        <Form
                            onSubmit={handleSubmit}
                            noValidate
                        >

                            <fieldset>
                                <legend>General Information</legend>

                                <Field>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Product Name"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Field>

                                {errors.name && <Error>{errors.name}</Error>}

                                <Field>
                                    <label htmlFor="organization">Organization</label>
                                    <input
                                        type="text"
                                        id="organization"
                                        placeholder="Organization Name"
                                        name="organization"
                                        value={organization}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Field>

                                {errors.organization && <Error>{errors.organization}</Error>}

                                <Field>
                                    <label htmlFor="image">Image</label>
                                    <FileUploader
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                        randomizeFilename
                                        storageRef={firebase.storage.ref("products")}
                                        onUploadStart={handleUploadStart}
                                        onUploadError={handleUploadError}
                                        onUploadSuccess={handleUploadSuccess}
                                        onProgress={handleProgress}
                                    />
                                </Field>
                                <Field>
                                    <label htmlFor="url">URL</label>
                                    <input
                                        type="url"
                                        id="url"
                                        name="url"
                                        placeholder="Product URL"
                                        value={url}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Field>

                                {errors.url && <Error>{errors.url}</Error>}

                            </fieldset>

                            <fieldset>
                                <legend>About your product</legend>
                                <Field>
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Field>

                                {errors.description && <Error>{errors.description}</Error>}
                            </fieldset>

                            {error && <Error>{error} </Error>}

                            <InputSubmit
                                disabled={!urlImage}
                                type="submit"
                                value="Crear Producto"
                            />
                        </Form>
                    </>
                )}

            </Layout>
        </div>
    )
}

export default NewProduct

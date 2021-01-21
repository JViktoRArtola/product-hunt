import React, {useEffect, useContext, useState} from 'react';
import {useRouter} from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {FirebaseContext} from '../../firebase';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {Field, InputSubmit} from '../../components/ui/Form';
import Button from '../../components/ui/Button';
import styles from '../../styles/Index.module.css'


const ProductContainer = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;
const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const Product = () => {

    // state del componente
    const [product, setProduct] = useState({});
    const [error, guardarError] = useState(false);
    const [comment, setComment] = useState({});
    const [consultDB, setConsultDB] = useState(true);

    // Routing para obtener el id actual
    const router = useRouter();
    const {query: {id}} = router;

    // context de firebase
    const {firebase, user} = useContext(FirebaseContext);

    useEffect(() => {
        if (id && consultDB) {
            const getProduct = async () => {
                const productoQuery = await firebase.db.collection('products').doc(id);
                const product = await productoQuery.get();
                if (product.exists) {
                    setProduct(product.data());
                    setConsultDB(false);
                } else {
                    guardarError(true);
                    setConsultDB(false);
                }
            }
            getProduct();
        }
    }, [id]);

    if (Object.keys(product).length === 0 && !error) return 'Loading...';

    const {comments, created, description, organization, name, url, urlImage, votes, creator, hasVoted} = product;

    // Administrar y validar los votes
    const voteProduct = () => {
        if (!user) {
            return router.push('/login')
        }

        // obtener y sumar un nuevo voto
        const nuevoTotal = votes + 1;

        // Verificar si el user actual ha votado
        if (hasVoted.includes(user.uid)) return;

        // guardar el ID del user que ha votado
        const nuevoHaVotado = [...hasVoted, user.uid];

        //  Actualizar en la BD
        firebase.db.collection('products').doc(id).update({
            votes: nuevoTotal,
            hasVoted: nuevoHaVotado
        })

        // Actualizar el state
        setProduct({
            ...product,
            votes: nuevoTotal
        })

        setConsultDB(true); // hay un voto, por lo tanto consultar a la BD
    }

    // Funciones para crear comments
    const commentChange = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    // Identifica si el comment es del creator del product
    const isCreator = id => {
        if (creator.id == id) {
            return true;
        }
    }

    const addComment = e => {
        e.preventDefault();

        if (!user) {
            return router.push('/login')
        }

        // información extra al comment
        comment.usuarioId = user.uid;
        comment.usuarioNombre = user.displayName;

        // Tomar copia de comments y agregarlos al arreglo
        const newComments = [...comments, comment];

        // Actualizar la BD
        firebase.db.collection('products').doc(id).update({
            comments: newComments
        })

        // Actualizar el state
        setProduct({
            ...product,
            comments: newComments
        })

        setConsultDB(true); // hay un COMENTARIO, por lo tanto consultar a la BD
    }

    // función que revisa que el creator del product sea el mismo que esta autenticado
    const canDelete = () => {
        if (!user) return false;

        if (creator.id === user.uid) {
            return true
        }
    }

    // elimina un product de la bd
    const deleteProduct = async () => {

        if (!user) {
            return router.push('/login')
        }

        if (creator.id !== user.uid) {
            return router.push('/')
        }

        try {
            await firebase.db.collection('products').doc(id).delete();
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <>
                {error ? <Error404/> : (
                    <div className={styles.container}>
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}>{name} </h1>

                        <ProductContainer>
                            <div>
                                <p>Published: {formatDistanceToNow(new Date(created))} </p>
                                <p>By: {creator.name} de {organization} </p>
                                <img src={urlImage}/>
                                <p>{description}</p>

                                {user && (
                                    <>
                                        <h2>Add a comment</h2>
                                        <form
                                            onSubmit={addComment}
                                        >
                                            <Field>
                                                <input
                                                    type="text"
                                                    name="mensaje"
                                                    onChange={commentChange}
                                                />
                                            </Field>
                                            <InputSubmit
                                                type="submit"
                                                value="Add Comment"
                                            />
                                        </form>
                                    </>
                                )}

                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comments</h2>

                                {comments.length === 0 ? "There is not comments" : (
                                    <ul>
                                        {comments.map((comment, i) => (
                                            <li
                                                key={`${comment.usuarioId}-${i}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comment.mensaje}</p>
                                                <p>Written by:
                                                    <span
                                                        css={css`
                                                            font-weight:bold;
                                                        `}
                                                    >
                                                    {''} {comment.username}
                                                    </span>
                                                </p>
                                                {isCreator(comment.userId) &&
                                                <ProductCreator>Is the Creator</ProductCreator>}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </div>
                            <aside>
                                <Button
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >Open the URL</Button>
                                <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >
                                    <p css={css`
                                        text-align: center;
                                    `}>{votes} Votes</p>

                                    {user && (
                                        <Button
                                            onClick={voteProduct}
                                        >
                                            Vote
                                        </Button>
                                    )}
                                </div>
                            </aside>
                        </ProductContainer>
                        {canDelete() &&
                        <Button
                            onClick={deleteProduct}
                        >Delete Product</Button>
                        }
                    </div>
                )}
            </>
        </Layout>
    );
}

export default Product;

import React, {useEffect, useState} from 'react'
import Layout from '../components/layout/Layout';
import {useRouter} from 'next/router';
import ProductDetail from '../components/layout/ProductDetail';
import useProducts from '../hooks/useProducts';
import styles from '../styles/Index.module.css'

const Search = () => {

    const router = useRouter();
    const {query: {q}} = router;

    // Todos los products
    const {products} = useProducts('created');
    const [result, setResult] = useState([]);

    useEffect(() => {
        const search = q.toLowerCase();
        const filter = products.filter(product => {
            return (
                product.name.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search)
            )
        });
        setResult(filter);

    }, [q, products]);

    return (
        <div>
            <Layout>
                <div className={styles.productsList}>
                    <div className={styles.container}>
                        <ul className={styles.bgWhite}>
                            {result.map(item => (
                                <ProductDetail
                                    key={item.id}
                                    product={item}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Search

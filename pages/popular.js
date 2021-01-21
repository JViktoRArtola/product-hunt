import React from 'react'
import Layout from '../components/layout/Layout';
import ProductDetail from '../components/layout/ProductDetail';
import useProducts from '../hooks/useProducts';
import styles from '../styles/Index.module.css'

const Popular = () => {

    const {products} = useProducts('votes');

    return (
        <div>
            <Layout>
                <div className={styles.productsList}>
                    <div className={styles.container}>
                        <ul className={styles.bgWhite}>
                            {products.map(item => (
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

export default Popular

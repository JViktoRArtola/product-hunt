import React, {useState} from 'react';
import Layout from "../components/layout/Layout";
import {Error, Field, Form, InputSubmit} from "../components/ui/Form";
import {css} from "@emotion/react";

const Signup = () => {
    const [error, setError] = useState(false);
    return (
        <div>
            <Layout>
                <h1 css={css`
                  text-align: center;
                  margin-top: 5rem;
            `}> Sign Up </h1>
                <Form
                    noValidate
                >
                    <Field>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            name="name"
                        />
                    </Field>
                    {/*{errors.name && <Error>{errors.name}</Error> }*/}
                    <Field>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            name="email"
                        />
                    </Field>
                    {/*{errors.email && <Error>{errors.email}</Error> }*/}
                    <Field>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                        />
                    </Field>
                    {/*{errors.password && <Error>{errors.password}</Error> }*/}
                    {error && <Error>{error}</Error> }
                    <InputSubmit
                        type="submit"
                        value="Create Account"
                    />
                </Form>
            </Layout>
        </div>
    );
};

export default Signup;

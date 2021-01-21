import React, {useState} from 'react';
import Layout from "../components/layout/Layout";
import {css} from "@emotion/react";
import {Error, Field, Form, InputSubmit} from "../components/ui/Form";
import useValidation from "../hooks/useValidation";
import validateSignUp from "../validations/validateSignUp";

const STATE_INICIAL = {
    name: '',
    email: '',
    password: ''
}

const Signup = () => {
    const [error, setError] = useState(false);
    const {values, errors, handleSubmit, handleChange, handleBlur} = useValidation(STATE_INICIAL, validateSignUp)
    const {name, email, password} = values
    return (
        <div>
            <Layout>
                <h1 css={css`
                  text-align: center;
                  margin-top: 5rem;
            `}> Sign Up </h1>
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Field>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Field>
                    {errors.name && <Error>{errors.name}</Error> }
                    <Field>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Field>
                    {errors.email && <Error>{errors.email}</Error> }
                    <Field>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Field>
                    {errors.password && <Error>{errors.password}</Error> }
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

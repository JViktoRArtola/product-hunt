import React, {useState} from 'react';
import Layout from "../components/layout/Layout";
import {css} from "@emotion/react";
import {Error, Field, Form, InputSubmit} from "../components/ui/Form";
import useValidation from "../hooks/useValidation";
import validateSignUp from "../validations/validateSignUp";
import firebase from "../firebase";
import Router from "next/router";

const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
}

const SignUp = () => {
    const [error, setError] = useState(false);
    const {values, errors, handleSubmit, handleChange, handleBlur} = useValidation(INITIAL_STATE, validateSignUp, signUp)
    const {name, email, password} = values

    async function signUp() {
        try {
            await firebase.signUp(name, email, password)
            await Router.push('/')
        } catch (e) {
            console.error('Error : ', e)
            setError(e.message)
        }
    }

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
                    {errors.name && <Error>{errors.name}</Error>}
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
                    {errors.email && <Error>{errors.email}</Error>}
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
                    {errors.password && <Error>{errors.password}</Error>}
                    {error && <Error>{error}</Error>}
                    <InputSubmit
                        type="submit"
                        value="Create Account"
                    />
                </Form>
            </Layout>
        </div>
    );
};

export default SignUp;

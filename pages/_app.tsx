
import App from "next/app";
import * as React from "react";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,body {
    margin: 0;
    padding: 0;
  }
`;


export default class MyApp extends App {
    static getInitialProps = async ({ Component, ctx } ) => {
        const pageProps = {};
        if (Component.getServerSideProps) {
            Object.assign(pageProps, await Component.getServerSideProps(ctx))
        }
        return {
            pageProps
        };
    }
    
    render() {
        const { Component, pageProps } = this.props;
        return (
            <React.Fragment>
                <GlobalStyle />
                <Component {...pageProps} />
            </React.Fragment>
        )
    }
}



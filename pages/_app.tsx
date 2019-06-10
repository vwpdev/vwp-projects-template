import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from "react-apollo-hooks";
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@src/Theme';
import GQLClient from '@src/Resources/GQLClient';

export default class VwpApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        // const jssStyles = document.querySelector('#jss-server-side');
        // if (jssStyles && jssStyles.parentNode) {
        //     jssStyles.parentNode.removeChild(jssStyles);
        // }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <ApolloProvider client={GQLClient()} >
                <Container>
                    <Head>
                        <title>VWP AppPage</title>
                    </Head>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </Container>
            </ApolloProvider>
        );
    }
}


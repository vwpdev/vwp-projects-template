import React from 'react'
import Document, {
	Head,
	Main,
	NextScript,
	NextDocumentContext
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document<any> {
	static async getInitialProps(ctx: NextDocumentContext) {
		const _initialProps = await Document.getInitialProps(ctx)
		const _sheet = new ServerStyleSheet()
		// const page = ctx.renderPage(App => props =>
		// 	sheet.collectStyles(<App {...props} />)
		// )
		// const styleTags = sheet.getStyleElement()
		// Resolution order
		//
		// On the server:
		// 1. app.getInitialProps
		// 2. page.getInitialProps
		// 3. document.getInitialProps
		// 4. app.render
		// 5. page.render
		// 6. document.render
		//
		// On the server with error:
		// 1. document.getInitialProps
		// 2. app.render
		// 3. page.render
		// 4. document.render
		//
		// On the client
		// 1. app.getInitialProps
		// 2. page.getInitialProps
		// 3. app.render
		// 4. page.render

		// Render app and page and get the context of the page with collected side effects.
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: App => props => _sheet.collectStyles(sheets.collect(<App {...props} />)),
			});

		const initialProps = await Document.getInitialProps(ctx);

		return {

			..._initialProps,
			...initialProps,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: (
				<React.Fragment>
					{sheets.getStyleElement()}
					{_sheet.getStyleElement()}
					{flush() || null}
				</React.Fragment>
			),
		};

	}

	render() {
		return (
			<html>
				<Head>
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,viewport-fit=cover"
					/>
					<meta name="description" content="" />
					<link
						rel="stylesheet"
						href="https://cdn.rawgit.com/filipelinhares/ress/master/dist/ress.min.css"
					/>
					<link rel="stylesheet" href="/static/styles/default.css" />
					<link rel="manifest" href="/static/manifest/manifest.json" />
					<link rel="manifest" href="manifest.webmanifest" />
					<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
					<script
						async
						src="https://cdn.jsdelivr.net/npm/pwacompat@2.0.7/pwacompat.min.js"
						integrity="sha384-ptgwb3/v69WGur7IwSnWOowVxE7hcRB3DG/EiHdejrw2sFNwUHynFbiRMPxc4hdS"
						crossOrigin="anonymous"
					/>
					{this.props.styleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}

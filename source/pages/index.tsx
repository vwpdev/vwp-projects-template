import React from 'react';
import { Request } from 'express';

export default function Index({ todos }: { todos: any[] }) {
    return (
        <div>
            App Tester <b>VWP</b> asds
        </div>
    );
}
Index.getInitialProps = async (request: Request) => {
    return { todos: [{ title: "teste", complete: false }] }
}
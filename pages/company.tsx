import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

// import { Container } from './styles';

export default function Company() {

    const companies = useQuery(gql`

        query Companies {
            get
        }
    
    `)


    return (
        <ul>
            {[1, 2, 3, 4].map((i) => <li onClick={() => alert('You Click in Company ' + i)}>COMPANY NAME {i}</li>)}
        </ul>
    );
}

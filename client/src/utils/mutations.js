import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($bookDetails: BookInput!) {
        saveBook(bookDetails: $bookDetails) {
        _id
        username
        email
        bookCount
        savedBooks
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation Mutation($userId: ID!, $bookId: ID!) {
        deleteBook(userId: $userId, bookId: $bookId) {
        _id
        bookCount
        username
        savedBooks
        }
    }
`
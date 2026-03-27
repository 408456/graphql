export const extractGraphQLError = (err) => {
    if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        return err.graphQLErrors[0].message;
    }
    if (err.networkError) {
        return `Ошибка сети: ${err.networkError.message}`;
    }
    return 'Произошла неизвестная ошибка';
};
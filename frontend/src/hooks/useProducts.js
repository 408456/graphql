import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../graphql/productQueries';
import { useState } from 'react';
import { extractGraphQLError } from '../utils/errorHandler';

export const useProducts = () => {
    const { loading: queryLoading, error: queryError, data, refetch } = useQuery(GET_PRODUCTS);
    const [createProductMutation] = useMutation(CREATE_PRODUCT);
    const [updateProductMutation] = useMutation(UPDATE_PRODUCT);
    const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleMutation = async (mutation, variables, successMessage) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await mutation({ variables });
            setSuccess(successMessage);
            await refetch();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(extractGraphQLError(err));
        } finally {
            setLoading(false);
        }
    };

    const createProduct = (input) => handleMutation(createProductMutation, { input }, 'Товар успешно создан');
    const updateProduct = (id, input) => handleMutation(updateProductMutation, { id, input }, 'Товар успешно обновлён');
    const deleteProduct = (id) => handleMutation(deleteProductMutation, { id }, 'Товар успешно удалён');

    return {
        products: data?.products || [],
        loading: queryLoading || loading,
        error: queryError?.message || error,
        success,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};
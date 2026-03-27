import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from '../graphql/queries';
import { useState } from 'react';
import { extractGraphQLError } from '../utils/errorHandler';

export const useUsers = () => {
    const { loading: queryLoading, error: queryError, data, refetch } = useQuery(GET_USERS);
    const [createUserMutation] = useMutation(CREATE_USER);
    const [updateUserMutation] = useMutation(UPDATE_USER);
    const [deleteUserMutation] = useMutation(DELETE_USER);

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

    const createUser = (input) => handleMutation(createUserMutation, { input }, 'Пользователь успешно создан');
    const updateUser = (id, input) => handleMutation(updateUserMutation, { id, input }, 'Пользователь успешно обновлен');
    const deleteUser = (id) => handleMutation(deleteUserMutation, { id }, 'Пользователь успешно удален');

    return {
        users: data?.users || [],
        loading: queryLoading || loading,
        error: queryError?.message || error,
        success,
        createUser,
        updateUser,
        deleteUser,
    };
};
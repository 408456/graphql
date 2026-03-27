import { useQuery, useMutation } from '@apollo/client';
import { GET_ORDERS, CREATE_ORDER, UPDATE_ORDER_STATUS, DELETE_ORDER } from '../graphql/orderQueries';
import { useState } from 'react';
import { extractGraphQLError } from '../utils/errorHandler';

export const useOrders = () => {
    const { loading: queryLoading, error: queryError, data, refetch } = useQuery(GET_ORDERS);
    const [createOrderMutation] = useMutation(CREATE_ORDER);
    const [updateOrderStatusMutation] = useMutation(UPDATE_ORDER_STATUS);
    const [deleteOrderMutation] = useMutation(DELETE_ORDER);

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

    const createOrder = (input) => handleMutation(createOrderMutation, { input }, 'Заказ успешно создан');
    const updateOrderStatus = (id, input) => handleMutation(updateOrderStatusMutation, { id, input }, 'Статус заказа обновлён');
    const deleteOrder = (id) => handleMutation(deleteOrderMutation, { id }, 'Заказ успешно удалён');

    return {
        orders: data?.orders || [],
        loading: queryLoading || loading,
        error: queryError?.message || error,
        success,
        createOrder,
        updateOrderStatus,
        deleteOrder,
    };
};
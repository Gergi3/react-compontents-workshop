import { get, post, put, del } from './requester';

export const getAllUsers = (search, criteria, page, limit, by, type) => {
    return get(`/users?search=${search}&criteria=${criteria}&page=${page}&limit=${limit}&sort=${by}&order=${type}`);
}

export const getUserById = (id) => {
    return get(`/users/${id}`);
}

export const editUserById = (data, id) => {
    return put(`/users/${id}`, data);
}

export const createUser = (data) => {
    return post('/users', data);
}

export const deleteUserById = (id) => {
    return del(`/users/${id}`);
}
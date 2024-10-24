export const parseRequestURL = () => {
    const request = {};
    const url = location.hash.slice(2).split('?')[0];

    [request.resource, request.id, request.action] = url.split('/');
    request.pageNumber = request.action.split('page=')[1];

    return request;
};

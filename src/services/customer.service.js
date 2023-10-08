import http from "../http-common.js";

const getAll = () => {
    return http.get("/customer");
}

const get = (id) => {
    return http.get(`/customer/${id}`);
};

const create = (data) => {
    return http.post("/customer", data);
};

const update = (id, data) => {
    return http.put(`/customer/${id}`, data);
}

const remove = (id) => {
    return http.delete(`/customer/${id}`);
}

const getAllRentals = (id) => {
    return http.get(`/customer/${id}/rentals`);
}
const CustomerService = {
    getAllRentals,
    getAll,
    get,
    create,
    update,
    remove
}

export default CustomerService;
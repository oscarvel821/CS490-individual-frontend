import http from "../http-common.js";

const getAll = () => {
    return http.get("/customer");
}

const get = (id) => {
    return http.get(`/customer/${id}`);
};

const create = (data) => {
    console.log("here")
    return http.post("/customer", data);
};

const CustomerService = {
    getAll,
    get,
    create,
}

export default CustomerService;
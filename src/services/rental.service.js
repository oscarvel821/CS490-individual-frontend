import http from "../http-common.js";

const getAll = () => {
    return http.get("/rental");
}

const get = (id) => {
    return http.get(`/rental/${id}`);
};

const create = data => {
    return http.post("/rental", data);
};

const RentalService = {
    getAll,
    get,
    create,
}

export default RentalService
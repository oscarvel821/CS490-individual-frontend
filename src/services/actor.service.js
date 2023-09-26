import http from "../http-common.js";

const getAll = () => {
    return http.get("/actor");
}

const get = (id) => {
    return http.get(`/actor/${id}`);
};

const create = data => {
    return http.post("/actor", data);
};

const getTop5 = () => {
    return http.get("/actor/top5")
}

const getDetails = (id) => {
    return http.get(`/actor/${id}/details`)
}

const ActorService = {
    getAll,
    get,
    create,
    getTop5,
    getDetails
}

export default ActorService
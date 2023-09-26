import http from "../http-common.js";

const getAll = () => {
    return http.get("/film");
}

const get = (id) => {
    return http.get(`/film/${id}`);
};

const create = data => {
    return http.post("/film", data);
};

const getTop5 = () => {
    return http.get("/film/top5")
}

const findByTitle = title => {
    return http.get(`/film?title=${title}`);
};

const findByActor = actor => {
    return http.get(`/film?actor=${actor}`);
}

const findByGenre = genre => {
    return http.get(`/film?genre=${genre}`);
}

const FilmService = {
    getAll,
    get,
    create,
    getTop5,
    findByTitle,
    findByActor,
    findByGenre
}

export default FilmService
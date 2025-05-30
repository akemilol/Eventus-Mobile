import api from './api';

export async function enviarRelato({ descricao, localizacao, usuarioId, dataEvento }) {
    return api.post('/relatos', {
    descricao,
    localizacao,
    usuarioId,
    dataEvento
    });
}

export async function listarRelatos() {
    return api.get('/relatos');
}

export async function buscarRelatoPorId(id) {
    return api.get(`/relatos/${id}`);
}

export async function deletarRelato(id) {
    return api.delete(`/relatos/${id}`);
}

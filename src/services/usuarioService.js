import api from './api';

export async function cadastrarUsuario(dados) {
    return api.post('/usuarios', dados);
}

export async function listarUsuarios() {
    return api.get('/usuarios');
}

export async function buscarUsuarioPorId(id) {
    return api.get(`/usuarios/${id}`);
}

export async function atualizarUsuario(id, dados) {
    return api.put(`/usuarios/${id}`, dados);
}

export async function deletarUsuario(id) {
    return api.delete(`/usuarios/${id}`);
}

export async function loginUsuario({ email, senha }) {
    return api.post('/usuarios/login', { email, senha });
}

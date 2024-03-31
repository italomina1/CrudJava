import React, { useState, useEffect } from 'react';
import blogFetch from '../axios/config';

const ModalEdite = ({ userId, onClose }) => {
    const [usuario, setUsuario] = useState({});
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');

    const createPut = async (e) => {
        e.preventDefault();

        const post = {
            nome: nome,
            idade: idade
        };

        try {
            await blogFetch.put('/users/' + userId, post);
            onClose(); 
        } catch (error) {
            console.error(error);
        }
    };

    const inputUsuarios = (nome, idade) => {
        const nomeInput = document.getElementById("nomeInput");
        const idadeInput = document.getElementById("idadeInput");
        nomeInput.value = nome;
        idadeInput.value = idade;
        setNome (nome);
        setIdade(idade);
    };

    const getUsers = async () => {
        try {
            const response = await blogFetch.get('/users/' + userId);
            const data = response.data; 
            setUsuario(data);
            inputUsuarios(data.nome, data.idade);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [userId]); 

    return (
        <div className="modal modaltrue" tabIndex="-1">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <form onSubmit={(e) => createPut(e)}>
                        <fieldset>
                            <div className="modal-header">
                                <h5 className="modal-title">Editar</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="nomeInput" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="nomeInput" placeholder="Nome..." value={nome} onChange={e => setNome(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="idadeInput" className="form-label">Idade</label>
                                    <input type="text" className="form-control" id="idadeInput" placeholder="Idade..." value={idade} onChange={e => setIdade(e.target.value)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Fechar</button>
                                <button type="submit" className="btn btn-primary">Salvar</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEdite;

import React, { useState, useEffect } from 'react';
import Navbar from '../componentes/Navbar';
import blogFetch from '../axios/config';
import ModalEdite from '../componentes/ModalEdite';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModalEdite, setShowModalEdite] = useState(false);
  const [usuarioId, setUsuarioId] = useState('');

  const getUsers = async () => {
    try {
      const response = await blogFetch.get('/users');
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalEdite = () => {
    setShowModalEdite(false);
  };

  const deleteUser = async (id) => {
    try {
      await blogFetch.delete('/users/' + id);
      console.log('ok');
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Idade</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <th scope="row">{usuario.id}</th>
                  <td>{usuario.nome}</td>
                  <td>{usuario.idade}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" className="btn btn-danger" onClick={() => deleteUser(usuario.id)}>Excluir</button>
                      <button type="button" className="btn btn-warning" onClick={() => {
                        setUsuarioId(usuario.id);
                        setShowModalEdite(true);
                      }}>Editar</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModalEdite && <ModalEdite userId={usuarioId} onClose={closeModalEdite} />}
    </div>
  );
}

export default Usuarios;

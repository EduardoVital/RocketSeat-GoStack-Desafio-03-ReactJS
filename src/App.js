import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState( [] )
  
  useEffect(() => {
    api.get('repositories', ).then( response => {
      setRepositories( response.data )
    } )
  }, [] )

  async function handleAddRepository() {
    const response = await api.post( 'repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: 'http://github.com/EduardoVital',
      techs: [
        'JavaScript',
        'ReactJS',
        'NodeJS'
      ]
    } )

    const repository = response.data

    setRepositories( [ ...repositories, repository ] )
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repositoryIndex = repositories.findIndex( repos => repos.id === id )
    repositories.splice(repositoryIndex, 1)
     
    setRepositories( [ ...repositories] )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        { repositories.map( repos => 
          <li key={ repos.id }>
            { repos.title }
            <button onClick={() => handleRemoveRepository(repos.id)}>
              Remover
            </button>
          </li>
        ) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

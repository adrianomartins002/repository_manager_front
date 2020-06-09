import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);


  async function handleAddRepository() {
    const title = document.getElementById("title").value;
    const url = document.getElementById("url").value;
    const techs = document.getElementById("techs").value;

    const result = await api.post('/repositories', {
      title,
      url,
      techs,
    });

    setRepositories([...repositories, result.data]);

  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`/repositories/${id}`);
    if (result.status === 204)
      setRepositories([...repositories.filter(repo => repo.id !== id)]);
  }

  async function searchRepos() {
    const data = await (await api.get('/repositories')).data;
    setRepositories(data);
  }

  useEffect(() => {
    searchRepos();
  }, [])


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 ?
          repositories.map(repo =>
            <li key={repo.title}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
          </button>
            </li>
          )
          :
          null
        }
      </ul>
      <div style={{
        marginTop: "20px"
      }}>
        <form className="formulario" action="" >
          <input id="title" type="text" placeholder="title" />
          <input id="url" type="text" placeholder="url" />
          <input id="techs" type="text" placeholder="techs" />
        </form>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;

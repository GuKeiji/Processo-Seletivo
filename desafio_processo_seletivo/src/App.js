import { Component } from "react";

export default class Repositorios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      listaRepositorio: []
    };
  };

  buscarRepositorio = (element) => {

    element.preventDefault();

    fetch('https://api.github.com/users/' + this.state.nome + '/repos?per_page=10')

      .then(resposta => resposta.json())

      .then(lista => this.setState({ listaRepositorio: lista }))

      .catch(erro => console.log(erro))
  }

  atualizarNome = async (nome) => {
    await this.setState({ nome: nome.target.value })
    console.log(this.state.nome)
  }

  render() {
    return (
      <div>
        <main>
          <section>
            <h2>Buscar Repositorios</h2>
            <input type="text" value={this.state.nome} onChange={this.atualizarNome} placeholder="User Github" />
            <button type="submit" onClick={this.buscarRepositorio}>Buscar</button>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Data de Criação</th>
                  <th>Tamanho</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listaRepositorio.map((repositorio) => {
                  return (
                    <tr key={repositorio.id}>
                      <td>{repositorio.id}</td>
                      <td>{repositorio.name}</td>
                      <td>{repositorio.description}</td>
                      <td>{repositorio.created_at}</td>
                      <td>{repositorio.size}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    )
  }
};

import React, { Component } from 'react';
import axios from 'axios';

import Select from './Select';


class FormEdit extends Component {
    constructor(props) {
        super(props);
        this.state ={
            id: '',
            nome: '',
            imagem: '',
            evochain: '',
            tipo0: '',
            tipo1: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPokemon = this.getPokemon.bind(this);

    }

    handleChange(e) {
        const { value, name} = e.target;
        this.setState({
            [name] : value
        })
    }

    getPokemon (e) {
        e.preventDefault();
        let id = parseInt(this.state.id);
        axios.get(`http://localhost:3001/pokemons/${id}`)
            .then(response => {
                console.log(response);
                this.setState({
                    nome : response.data.nome,
                    imagem : response.data.imagem,
                    evochain : response.data.evochain,
                    tipo0: response.data.tipo0,
                    tipo1 : response.data.tipo1
                })
            })
    }


    handleSubmit(e) {
        e.preventDefault();
        let id = parseInt(this.state.id);
        axios({
            method: 'put',
            url: `http://localhost:3001/pokemons/${id}`,
            data : {
                "nome" : this.state.nome,
                "imagem" : this.state.imagem,
                "evochain" : parseInt(this.state.evochain),
                "tipo0" : this.state.tipo0,
                "tipo1" : this.state.tipo1
            }
        }).then(response => {
            if(response.status === 200) {
                alert("Atualizado com sucesso");
            }
        })
    }
    render() {
        return (
            <div className="col">
                <form onSubmit={this.getPokemon}>
                  <div className="form-group row mt-">
                        <label className="col-sm-2 col-form-label">PokeID</label>
                            <div className="col">
                                <input
                                    name="id"
                                    type="number"
                                    min="0"
                                    max={this.props.maxPoke}
                                    className="form-control"
                                    placeholder={`1 - ${this.props.maxPoke}`}
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="col-sm-1">
                                <button type="submit" className="btn btn-primary">Abrir</button>
                            </div>
                  </div>  
                </form>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Nome</label>
                        <div className="col">
                            <input name="nome" type="text" className="form-control" value={this.state.nome} onChange={e => this.handleChange(e)}/>
                        </div>
                        <label className="col-sm-2 col-form-label">ID Evolução</label>
                        <div className="col">
                            <input name="evochain" type="number" min="0" className="form-control" value={this.state.evochain} onChange={e => this.handleChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Imagem URL</label>
                        <div className="col">
                            <input name="imagem" type="text" className="form-control" value={this.state.imagem} onChange={e => this.handleChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Tipo</label>
                        <div className="col">
                            <Select name={'tipo0'} handleChange={this.handleChange} defaultValue={this.state.tipo0}/>
                        </div>
                        <div className="col">
                            <Select name={'tipo1'} handleChange={this.handleChange} defaultValue={this.state.tipo1}/>
                        </div>
                    </div>
                    
                        <button type="submit" className="btn btn-primary">Salvar</button> &nbsp;
                        <button type="reset" className="btn btn-primary">Limpar</button> 
                </form>
            </div>
        )
    }
}

export default FormEdit;
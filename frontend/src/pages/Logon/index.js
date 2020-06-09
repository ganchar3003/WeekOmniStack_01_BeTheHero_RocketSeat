import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import './styles.css';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import LogoImg from '../../assets/logo.svg';

export default function Logon(){
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('session', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile')
        } catch (err){
            alert ('Falha no login, tente novamente.');
        }
    }
    
    return (
        <div className="Logon-container">
            <section className="form">
                <img src={LogoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setID(e.target.value)}                    
                    />
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não Tenho Cadastro
                    </Link>

                </form>
            </section>

             <img src={heroesImg} alt="Heroes" />
        </div>
    )
}
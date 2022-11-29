import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import api from '../api'
import Backdrop  from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import AlertBar from '../ui/AlertBar'

export default function LoginForm() {
    const [state, setState] = React.useState({
        email: '',
        senha:'',
        resultado: '',
        aguardando: false,
        alertBarOpen: false,
        alertBarMsg: '',
        alertBarSeverity:''
    })
    const { email, senha, resultado, aguardando, alertBarOpen } = state

    function handleInputChange(event) {
        setState({...state, [event.target.id]: event.target.value})
    }

    async function handleFormSubmit(event) {
        setState({...state, aguardando: true})
        event.preventDefault()
        try {
            const result = await api.post('usuario/login', {email, senha})
            setState({...state, resultado: result.data, aguardando: false})
        }
        catch(error) {
            setState({...state, resultado: 'ERRO: ' + error.message, aguardando:false})
        }
    }

    return (
        <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={aguardando}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
            <h1 style={{textAlign: 'center'}}>Autentique-se</h1>

            <Paper elevation={4} sx={{
                maxWidth: '300px',
                width: '90%',
                margin: '0 auto',
                padding: '30px'
            }}>
                <form onSubmit={handleFormSubmit}>
                <TextField 
                    sx={{ marginBottom: '30px' }}
                    id="email" 
                    label="E-mail"
                    value={email}
                    variant="filled"
                    placeholder="Informe o email"
                    fullWidth
                    onChange={handleInputChange}
                />

                <TextField 
                    sx={{ marginBottom: '30px' }}
                    id="senha" 
                    type="password"
                    label="Senha"
                    value={senha}
                    variant="filled"
                    placeholder="Informe a senha"
                    fullWidth
                    onChange={handleInputChange}
                />

                <Toolbar sx = {{
                    width: '100%',
                    justifyContent: 'space-around',
                    padding: "0 !important"
                }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        enabled = {email.trim() === '' || senha.trim() === ''}
                    >
                        Enviar
                    </Button>
                </Toolbar>
                </form>
            </Paper>
            <div>
                {JSON.stringify(resultado)}
            </div>
        </>

    )
}

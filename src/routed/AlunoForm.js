import React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers'
import ptLocale from 'date-fns/locale/pt-BR'
import { makeStyles } from '@mui/styles'
import InputMask from 'react-input-mask'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { display } from '@mui/system'
import AlertBar from '../ui/AlertBar'

const useStyles = makeStyles(theme => ({
    form: {
        maxWidth: '90%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        '& .MuiFormControl-root': {
            minWidth: '200px',
            maxWidth: '500px',
            marginBottom: '24px'
        }
    },
    toolbar: {
        width: '100%',
        justifyContent: 'space-around',
    }
}))

const unidadesFed = [
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'SP', nome: 'São Paulo' }
]

const turmas = [
    { sigla: 'ESP10', descrição: '[ESP10] Espanhol iniciante' },
    { sigla: 'FRA10', descrição: '[FRA10] Francês iniciante' },
    { sigla: 'ING10', descrição: '[ING10] Inglês iniciante' }
]

export default function AlunoForm() {

    const classes = useStyles()

    const [state, setState] = React.useState (
        () => ({
            // Campos correspondentes a controles de seleção
            // precisam ter um valor inicial
          aluno: {uf: '', turma: ''},
          alertSeverity: 'success',
          isAlertOpen: false,
          alertMessage
        })
    )
    const {
        aluno,
        alertSeverity,
        isAlertOpen,
        alertMessage
    } = state

    function handleInputChange(event, fieldName = event.target.id) {
        console.log(`fieldName: ${fieldName}, value: ${event?.target?.value}`)

        // Sincroniza o valor do input com a variável de estado
        const newAluno = {...aluno} // Tira uma cópia do aluno

        // O componente DesktopDatePicker envia newValue em vez de
        // event; portanto, é necessário tratamente específico para ele
        if(fieldName === 'data_nascimento') newAluno[fieldName] = event
        else newAluno[fieldName] = event.target.value // Atualiza o campo

        setState({...state, aluno: newAluno})
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        // fecha a barra de alerta
        setState({...state, isAlertOpen: false})
    };

    return (
        <>

        <AlertBar severity={alertSeverity} open={isAlertOpen} onClose={handleAlertClose}>
            {alertMessage}
        </AlertBar>

        <h1> Cadastro de alunos </h1>

        <form className={classes.form}>
            <TextField 
            id="nome" 
            label="Nome completo"
            value={aluno.nome}
            placeholder="Informe o nome completo do(a) aluno(a)"
            variant="filled"
            required
            fullWidth
            onChange = {handleInputChange}
            />

    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptLocale}>
            <DesktopDatePicker
            label="Data de nascimento"
            inputFormat="dd//MM/yyyy"
            value={aluno.data_nascimento}
            onChange = {newValue => handleInputChange(newValue, 'data_nascimento')}
            renderInput={(params) => <TextField 
                id="data_nascimento"
                variant="filled"
                required
                fullWidth    
            {...params} />}
            />
        </LocalizationProvider>

        <TextField 
            id="doc_identidade" 
            label="Documento de identidade"
            value={aluno.doc_identidade}
            placeholder="Informe o documento de identidade"
            variant="filled"
            required
            fullWidth
            onChange = {handleInputChange}
        />

        <InputMask
            mask="999.999.999-99"
            value={aluno.cpf}
            onChange = {event => handleInputChange(event, 'cpf')}
        >
            {
                () => <TextField 
                id="cpf" 
                label="CPF"
                placeholder="Informe o CPF"
                variant="filled"
                required
                fullWidth
            />
            }
        </InputMask>

        <TextField 
            id="logradouro" 
            label="Logradouro (Rua, Av.., etc..."
            value={aluno.logradouro}
            placeholder="Informe o logradouro"
            variant="filled"
            required
            fullWidth
            onChange = {handleInputChange}
        />

        <TextField 
            id="num_imovel" 
            label="Nº"
            value={aluno.num_imovel}
            placeholder="Informe o logradouro"
            variant="filled"
            required
            fullWidth
            onChange = {handleInputChange}
        />

        <TextField 
            id="complemento" 
            label="Complemento"
            value={aluno.complemento}
            placeholder="Informe o complemento do imóvel (se houver)"
            variant="filled"
            fullWidth
            onChange = {handleInputChange}
        />

        <TextField 
            id="municipio" 
            label="Município"
            value={aluno.municipio}
            placeholder="Informe o município"
            variant="filled"
            required
            fullWidth
            onChange = {handleInputChange}
        />

        <TextField 
            id="uf" 
            label="UF"
            value={aluno.uf}
            placeholder="Informe a UF"
            variant="filled"
            required
            fullWidth
            select
            onChange = {event => handleInputChange(event, 'uf')}
        >

            {
                unidadesFed.map(uf => (
                    <MenuItem key={uf.sigla} value={uf.sigla}>
                        {uf.nome}
                    </MenuItem>
                ))
            }
        </TextField>

        <InputMask
            mask="(99) 9999-9999"
            value={aluno.telefone}
            onChange = {event => handleInputChange(event, 'telefone')}
        >
            {
                () => <TextField 
                id="telefone" 
                label="Celular"
                placeholder="Informe o celular"
                variant="filled"
                required
                fullWidth
            />
            }

        </InputMask>

        <TextField 
            id="email" 
            label="E-mail"
            value={aluno.email}
            placeholder="Informe a email"
            variant="filled"
            required
            fullWidth
            onChange = {handleInputChange}
        />

            
        <TextField 
            id="turma" 
            label="Turma"
            value={aluno.turma}
            placeholder="Informe a turma"
            variant="filled"
            required
            fullWidth
            select
            onChange = {event => handleInputChange(event, 'turma')}
        >

            {
                turmas.map(t => (
                    <MenuItem key={t.sigla} value={t.sigla}>
                        {t.descrição}
                    </MenuItem>
                ))
            }
        </TextField>

        <Toolbar className = {classes.toolbar}>
            <Button
                variant="contained"
                color="secondary"
                type="submit"
            >
                Enviar
            </Button>
            <Button
                variant="outlined"
            >
                Voltar
            </Button>
        </Toolbar>

    </form>

    <p>{JSON.stringify(aluno)}</p>
        </>
    )
}
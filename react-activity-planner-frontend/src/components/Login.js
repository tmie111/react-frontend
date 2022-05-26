import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const Login = (props) => {
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        let body = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data => {
            props.setUserID(data.user_id);
            navigate("/activities")
        })
    }

    return <div>
            <h1>Login Page</h1>
        <Paper className="card login" elevation={5}>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        name="username"
                        id="username-login"
                        label="Username"
                        variant="outlined" />
                </div>
                <div>
                    <TextField
                        name="password"
                        type="password"
                        id="password-login"
                        label="Password"
                        variant="outlined" />
                </div>
                <div>
                    <Button className="btn login" type="submit" variant="contained">Login</Button>
                </div>

            </form>
        </Paper>
        </div>
}

export default Login;

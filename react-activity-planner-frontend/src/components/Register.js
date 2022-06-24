import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        let body = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        fetch('https://activity-planner-backend.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data => {
            console.log(data.error);
            if(data.error){
                alert(data.error);
            }else{
                props.setUserID(data.user_id);
                navigate("/login");
            }   
        })
    }

    return (
        <div>
            <h1>Registration Page</h1>
            <Paper className="card register" elevation={5}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            name="username"
                            id="username"
                            label="Username"
                            variant="outlined" />
                    </div>
                    <div>
                        <TextField
                            name="email"
                            id="email"
                            label="Email"
                            variant="outlined" />
                    </div>
                    <div>
                        <TextField
                            name="password"
                            type="password"
                            id="password"
                            label="Password"
                            variant="outlined" />
                    </div>
                    <div>
                        <Button type="submit" className="btn register">Register</Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default Register;
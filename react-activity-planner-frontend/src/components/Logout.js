import { useNavigate } from 'react-router-dom';

const Logout = (props) => {

    let navigate = useNavigate();

    props.setUserID(null);
    navigate("/");

    return <div></div>
}

export default Logout;
import Paper from "@mui/material/Paper";


const Home = () => {
    return <div>
        <h1>Activity Planner</h1>
        <h3><em>your new favorite productivity app</em> <br></br>
        register account to:</h3>
        <div className="home blocks">
            <Paper className="card home" elevation={5}>
            <h3><em>add tasks seamlessly</em></h3>
            <img src="/addactivity.png" alt="sorted activities" />
           </Paper>
        </div>
        <div>
            <Paper className="card home" elevation={5}>
            <h3><em>add activities to your favorites</em></h3>
            <img src="/favorites.png" alt="favorites" />
           </Paper>
        </div>
        <div>
            <Paper className="card home" elevation={5}>
            <h3><em>sort tasks by deadlines</em></h3>
            <img src="/displayactivities.png" alt="sorted activities" />
           </Paper>
        </div>
    </div>
}

export default Home;
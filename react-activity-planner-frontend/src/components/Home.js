import Paper from "@mui/material/Paper";


const Home = () => {
    return <div>
        <h1>Activity Planner</h1>
        <h3><em>your new favorite productivity app</em> <br></br>
        register account to:</h3>
        <div>
            <Paper className="card home" elevation={5}>
            add tasks seamlessly
            <img src="/addactivity.png" alt="sorted activities" />
           </Paper>
        </div>
        <div>
            <Paper className="card home" elevation={5}>
            add activities to your favorites
            <img src="/favorites.png" alt="favorites" />
           </Paper>
        </div>
        <div>
            <Paper className="card home" elevation={5}>
            sort tasks by deadlines
            <img src="/displayactivities.png" alt="sorted activities" />
           </Paper>
        </div>
    </div>
}

export default Home;
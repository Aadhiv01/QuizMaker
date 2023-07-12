import { useEffect, useState } from "react";
import Navbar from "./Navbar";


function ScoresHistory() {

    const [result_set , setResultSet] = useState([]);
    const [fetched_results, setFetchedResults] = useState(false);

    useEffect(() => {
        console.log("uid: ", localStorage.getItem('uid'));
        fetchResults();
    }, []);

    const fetchResults = async (event) => {
        setFetchedResults(true);
        const request = await fetch('http://127.0.0.1:5000/quiz/student/result/history', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'uid': localStorage.getItem('uid')})
          });
        const data = await request.json();
        console.log("Fetched Result Data: ", data['result_set']);
        setResultSet(data['result_set']);
    }

    useEffect(() => {
        console.log("Type of result set: ", typeof(result_set));
        console.log("Result set fetch: ", result_set);
    }, [])


    return (
        <>
            <Navbar />
            <br></br>
            <h2 style={{'color': 'white', 'textAlign': 'center'}}>Scores History</h2>
            <br></br>
            <div className="container" style={{'color': 'white'}}>
                {fetched_results && result_set && 
                <table className="table table-striped table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>Quiz Number</th>
                            <th>Category</th>
                            <th>Percentage</th>
                            <th>Date Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result_set.map((item, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item[3]}</td>
                                <td>{item[4]}</td>
                                <td>{item[5]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </>
    )

}

export default ScoresHistory;

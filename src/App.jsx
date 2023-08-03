import React,{useState} from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    const [inputtext, setInputext] = useState('');
    const [todos, setTodos] = useState([]);

    const inputEvent = (event) => {
        setInputext(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const todo = {
            task: inputtext,
            completed: false // Mark the task as not completed when added
        };
        console.log(todo);
        if (todo.task === "") {
            alert("Please enter a task");
        } else {
            await axios.post("http://localhost:8080/api/create", todo).then((res) => {
                res.status === 200 && console.log("Todo Added Successfully");
                setTodos((prevTodos) => [...prevTodos, { ...todo, id: res.data.id }]);
                console.log(res.data.id);
                setInputext("");
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:8080/api/delete/${id}`).then((res) => {
            res.status === 200 && console.log("Todo Deleted Successfully");
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        }).catch((error) => {
            console.log(error);
        });
    };

    const toggleCompleted = async (id) => {
        console.log(id);
        const todoToUpdate = todos.find((todo) => todo.id === id);
        const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
        await axios.put(`http://localhost:8080/api/update/${id}`, updatedTodo).then((res) => {
            res.status === 200 && console.log("Todo Updated Successfully");
            setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))); //
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="main">
            <h1>Todo List</h1>
            <form className="dataform">
                <input type="text" value={inputtext} onChange={inputEvent} />
                <button type="submit" onClick={handleSubmit}>Add Todo</button>
            </form>
            <ul className="datas">
                {todos.slice(0).reverse().map((todo) => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <span onClick={() => toggleCompleted(todo.id)}>{todo.task}</span>
                        <button className="deletebtn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;


// export default function App() {
//     const [inputtext, setInputext] = useState();
//     const [todos, setTodos] = useState([
//         {
//             task: ""
//         }
//     ]);

//     const inputEvent = (event) => {
//         event.preventDefault();
//         setInputext(event.target.value);
//     };
//     const deleteTodo = async(index) => {
//         console.log(index);
//         await axios.delete(`http://localhost:8080/api/delete/${index}`).then((res) => {
//             console.log(res.data);
//             console.log(res.data.response.data);
//             setTodos((preTodos)=>[...preTodos, { task: res.data.task }]);
//         }).catch((error) => {
//             console.log(error);
//         });
//     };

//     const handleSubmit = async(event) => {
//         event.preventDefault();
//         const todo = {
//             task: inputtext
//         };
//         console.log(todo);
//         if(todo.task === ""){
//             alert("Please enter a task");
//         }else{
//         await axios.post("http://localhost:8080/api/create", todo).then((res) => {
//             res.status === 200 && console.log("Todo Added Successfully");
//             // console.log(res.data);
//             // console.log(res.data.response.data);
//             setTodos((preTodos)=>[...preTodos, { task: res.data.task }]); 
//             setInputext("");
//         }).catch((error) => {
//             console.log(error);
//         });
//     }
//     };



//     return (
//         <div className="main">
//             <h1>Todo List</h1>
//             <form className="dataform">
//                 <input type="text" name={inputtext} onChange={inputEvent}/>
//                 <button type="submit" onClick={handleSubmit}>Add Todo</button>
//             </form>
//             <ul className="datas">
//             {todos.slice(0).reverse().map((todo, index) => (
//     <li key={index}>{todo.task}
//     <button className="deletebtn"  onClick={(index)=>deleteTodo(index)}>Delete</button></li>
//   ))}
//             </ul>
//         </div>
//     );
// }
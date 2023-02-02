import axios from "axios";
import { createContext, useReducer } from "react";
import history from "../components/helpers/history";

export const todoContext = createContext()

const INITIAL_STATE = {
    todoData: [],
    limit: 4,
    page: 1,
    totalCount: 0
}
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_TODO":
            return { ...state, todoData: action.payload.data }
        case "SET_PAGE":
            return [...state,action.payload]

        case "ADD_TODO":
            return { ...state, todoData: [...state.todoData, action.payload] }

        case "EDIT_TODO":
            return { ...state, todoData: state.todoData.map(todo =>{
                if (todo.id === action.payload.id) {
                    return action.payload
                }
                return todo
            })}
        case "DELETE_TODO":
            return { ...state, todoData: state.todoData.filter(todo=>todo.id!==action.payload.id) }

        default:
            break;
    }
}

const TodoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)


    const getTodos = async () => {
        const { data,headers} = await axios(`http://localhost:8000/todos${history.location.search}`);

        dispatch({
            type: "GET_TODO",
            payload: {
                data: data,
                totalCount: headers["x-total-count"]
            }
        })
    };

    const addTodo = async (obj) => {
        const { data } = await axios.post("http://localhost:8000/todos", obj);

        dispatch({
            type: "ADD_TODO",
            payload: data
        })


    };

    const editTodo = async (obj, id) => {
        const { data } = await axios.patch(
            `http://localhost:8000/todos/${id}`,
            obj
        );
            dispatch({
            type: "EDIT_TODO",
            payload: data
        })
    };
    const deleteTodo = async (id) => {
        const { data } = await axios.delete(
            `http://localhost:8000/todos/${id}`,
            )
            dispatch({
                type: "DELETE_TODO",
                payload: data
            })
    }
    const setQuery = (key,value) => {
        const search= new URLSearchParams(history.location.search)
        if (value) {
            search.set(key,value)
        } else {
            search.delete(key)
        }
        history.push(`/?${search.toString()}`)
    }

    const searchFilter = (value)=>{
        setQuery("q",value)
        getTodos()
    }

    const getPagination = (value) => {
        setQuery("_limit",state.limit)
        setQuery("_page",value)
        getTodos()
    }

    const setPage = (page) => {
        dispatch ({
            type: "SET_PAGE",
            payload: page
        })
    }

    return (
        <todoContext.Provider value={{
            todoData: state.todoData,
            getTodos,
            editTodo,
            deleteTodo,
            addTodo,
            searchFilter,
            getPagination,
            setPage
        }}>
            {children}
        </todoContext.Provider>
    )
}
export default TodoContextProvider
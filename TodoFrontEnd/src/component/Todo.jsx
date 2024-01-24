import { useState, useEffect } from "react";
import "./todo.scss";
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from "react-datepicker";
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditModal from "./EditModal";
import axios from "axios";
import { parseISO } from "date-fns";
import Navbar from "./NavBar/navbar";
import { useParams, useNavigate} from "react-router-dom";


const Todo = ({ user }) => {
  const [task, setTask] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [capturedData, setCapturedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [taskID, setTaskID] = useState('');
  const navigate= useNavigate();
  const { userId } = useParams();
  const token= localStorage.getItem(`${userId}Token`);
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
  const checkAuth = async() =>{
    if(token === null){
      navigate("/");
    } else{
      getTask();
    }
  }

  const getTask = async () => {
    try {
      //console.log(`Bearer ${token}`);
      let response = await axios.get(`https://todo-api-mocha.vercel.app/tasks/${userId}` );
      //console.log("Response: ", response);
      setCapturedData(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const postTask = async (postData) => {
    try {
      postData.UserId = userId;
      let response = await axios.post(`https://todo-api-mocha.vercel.app/tasks/${userId}`, postData);
      //console.log('POST request successful:', response);
      getTask(); // Ensure this is called after successful POST
    } catch (error) {
      console.error('POST request failed:', error);
    }
  };

  const updateTask = async (updateData, id) => {
    try {
      //console.log("update data: ", updateData);
      let response = await axios.patch(`https://todo-api-mocha.vercel.app/tasks/${userId}/${id}`, updateData);
      //console.log('PUT request successful:', response);
      getTask(); // Ensure this is called after successful POST
    } catch (error) {
      console.error('PUT request failed:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      let response = await axios.delete(`https://todo-api-mocha.vercel.app/tasks/${userId}/${id}`);
      //console.log('DELETE request successful:', response);
      getTask(); // Ensure this is called after successful POST
    } catch (error) {
      console.error('DELETE request failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();
   
  }, []);

  const handleDateChange = (date) => {
    const selectedDate = typeof date === 'string' ? parseISO(date) : date;
    setSelectedDate(selectedDate);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleStatusChange = (e) => {
    setTaskStatus(e.target.value);
  };

  const handleClick = () => {
    const newData = { task: task, status: taskStatus, date: selectedDate.toISOString() };
    postTask(newData);
    //console.log(task, taskStatus, selectedDate);
    // // Reset input fields after adding a task
    // setTask('');
    // setTaskStatus('');
    // setSelectedDate(null);
  };

  const handleEditClick = (index, id) => {
    // console.log("id: ",id);
    setTaskID(id);
    const editItem = capturedData[index];
    setTask(editItem.task);
    setTaskStatus(editItem.status);
    setSelectedDate(editItem.date ? parseISO(editItem.date) : null);
    setEditIndex(index);
    setEditModalOpen(true);
  };

  const handleEditModalSave = (editedText, editStatus, editedDate, id) => {
    // const updatedData = [...capturedData];
    //console.log("edited date : ", editedDate);
    const dateToSave = editedDate instanceof Date ? editedDate.toISOString() : new Date().now;
    //console.log("date to Save: ", dateToSave);
    const updatedData = {
      task: editedText === '' ? task : editedText,
      status: editStatus === '' ? taskStatus : editStatus,
      date: dateToSave === '' ? selectedDate : dateToSave
    }
    updateTask(updatedData, id);
    setEditIndex(null);
    setEditModalOpen(false);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteClick = (id) => {
    deleteTask(id);
    // const updatedData = [...capturedData];
    // updatedData.splice(index, 1);
    // setCapturedData(updatedData);
    // setEditIndex(null);
  };

  return (
    <>
      <Navbar name= {userId}/>
      <div className="todo-container">
        <div className="form-container">
          <div className="heading">
            <h1>TODO LIST</h1>
          </div>
          <div className="data-container">
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter Task"
                onChange={handleTaskChange}
                value={task} />
              <input
                type="text"
                placeholder="Enter Status"
                onChange={handleStatusChange}
                value={taskStatus} />
              <ReactDatePicker
                type="date"
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Select Date" />
              <button className="btn" onClick={handleClick}>ADD</button>
            </div>
            <ul>
              {capturedData.map((data, index) => (
                <li key={index}>
                  <span>Task: {data.task},</span><span> Status: {data.status},</span> <span>Date: {data.date}</span>
                  <button onClick={() => handleEditClick(index, data._id)}><FaEdit /></button>
                  <button onClick={() => handleDeleteClick(data._id)}><FaTrash /></button>
                </li>
              ))}
            </ul>
            {/* Edit Modal */}
            <EditModal
              isOpen={isEditModalOpen}
              onClose={handleEditModalClose}
              onSave={handleEditModalSave}
              initialText={task}
              initialStatus={taskStatus}
              initialDate={selectedDate}
              taskId={taskID}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
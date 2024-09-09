import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
            setUserField(result.data.user);
        } catch (err) {
            console.log("Something went wrong", err);
        }
    };

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/users/${id}`, userField);
            navigate('/');
        } catch (err) {
            console.log("Something went wrong", err);
        }
    };

    const clickToBackHandler = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Edit Form</h1>
            <form onSubmit={onSubmitChange}>
                <div className="mb-3 mt-3">
                    <label className="form-label">ID:</label>
                    <input type="text" className="form-control" id="id" name="id" value={id} disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Full Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Full Name"
                        name="name"
                        value={userField.name}
                        onChange={changeUserFieldHandler}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        value={userField.email}
                        onChange={changeUserFieldHandler}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Password:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        name="password"
                        value={userField.password}
                        onChange={changeUserFieldHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            <div className='container d-flex justify-content-center'>
                <button className='btn btn-primary' onClick={clickToBackHandler}>Back To Home</button>
            </div>
        </div>
    );
};

export default Edit;

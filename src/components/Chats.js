import React, {useContext, useState, useEffect} from 'react';
import Navbar from './Navbar';
import styles from './Chats.module.css';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import axios from 'axios';
import {AuthContext} from './context/AuthContextProvider';


const Chats = () => {
    
    const [loading , setLoading] = useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();

    useEffect(() =>{
        if(!user) {
            history.push("/");
            return;
        }

        axios.get("https://api.chatengine.io/users/me",{
            headers: {
                "project-id": "263013af-ab03-4646-a155-3ba5532e820c",
                "user-name": user.email ,
                "user-secret": user.uid 
            }
            })
            .then(() => {
                setLoading(false)
            })
            .catch(() =>{
                let formdata = new FormData();
                formdata.append("email" , user.email);
                formdata.append("username" , user.email);
                formdata.append("secret" , user.uid);
                getFile(user.photoURL)
                .then(avator =>{
                    formdata.append("avator", avator , avator.name)
                    axios.post("https://api.chatengine.io/users/" , formdata, {
                        headers : {
                            "private-key" : "f1e8a093-5cea-4d9c-b568-73aa172cbf0e"
                        }
                    })
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
            })
        })

    }, [user , history])

    const getFile = async (url) =>{
        const response = await fetch(url);
        const data = await response.blob();
        return new File ([data] , "userPhoto.jpg" , {type : "image/jpeg"})
    }

    const logoutHandler = async () =>{
        await auth.signOut();
        history.push("/")
    }
    
    if (!user || loading) return "loading..."

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler}/>
            <ChatEngine 
                height="calc(100vh - 50px)"
                projectID="263013af-ab03-4646-a155-3ba5532e820c"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;
import { getAboutUser, getAllUsers } from '@/config/redux/action/authAction';
import { createPost, deletePost, getAllComments, getAllPosts, incrementLike, postComment } from '@/config/redux/action/postAction';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useEffectEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import styles from "./index.module.css";
import { BASE_URL } from '@/config';
import { resetPostId } from '@/config/redux/reducer/postReducer';


function dashboard() {
    return (
        <>
            
        </>
    );
}

export default dashboard;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AuthProvider from './store/auth/AuthProvider';
import {TasksProvider} from "./store/tasks/tasks.context";
import {TomatoProvider} from "./store/tomato/tomato.context";
import {CustomizeCycleMenuProvider} from "./store/CustomizeCycleMenu/CustomizeCycleMenu.context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <TasksProvider>
            <TomatoProvider>
                <CustomizeCycleMenuProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </CustomizeCycleMenuProvider>
            </TomatoProvider>
        </TasksProvider>
    </AuthProvider>
);

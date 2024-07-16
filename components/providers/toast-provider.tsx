"use client"
import React, { createContext, useContext } from 'react';
import { ToastContainer, toast, ToastContent, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (content: ToastContent<unknown>, options?: ToastOptions<unknown>) => toast(content, options)

// Criação do contexto
const ToastContext = createContext(notify);
// Componente ToastProvider
export const ToastProvider = ({ children }: any) => {

    return (
        <ToastContext.Provider value={notify}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};

// Hook personalizado para utilizar o contexto do ToastProvider
export const useToast = () => useContext(ToastContext);

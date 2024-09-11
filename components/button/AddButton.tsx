import { motion } from 'framer-motion';
import React from 'react';

type AddButtonProps = {
    isOpen: boolean;
    toggleMenu: (props?: any) => any;
};

const buttonVariants = {
    open: {
        transition: { duration: 0.5 },
    },
    closed: {
        transition: { duration: 0.5 },
    },
};

const AddButton: React.FC<AddButtonProps> = ({ isOpen, toggleMenu }) => {

    return (
        <motion.button
            onClick={toggleMenu}
            className="w-16 max-h-12 h-12 flex flex-col justify-between p-1 rounded-sm focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={buttonVariants}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
        >
            <motion.span
                className="w-full h-1 bg-neutral-400 rounded-sm"
                animate={{
                    transition: { duration: 0.5 },
                    rotate: isOpen ? 45 : 90,
                    y: isOpen ? 16 : 14,
                }}
            />

            <motion.span
                className="w-full h-1 bg-neutral-400 rounded-sm"
                animate={{
                    transition: { duration: 0.5 },
                    rotate: isOpen ? -45 : 0,
                    y: -22
                }}
            />
        </motion.button>
    );
};

export default AddButton;

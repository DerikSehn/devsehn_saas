// components/MarkdownEditor.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
const mdParser = new MarkdownIt();

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
    return (
        <MdEditor
            value={value}
            className='w-full h-full min-h-[500px]'
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }) => onChange(text)}
        />
    );
};

export default MarkdownEditor;
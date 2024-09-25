import MarkdownEditor from '@/components/MarkdownEditor';
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { Button } from '@/components/ui/button';
import { useTableItemEditor } from '@/hooks/use-table-item-editor';
import { getFieldConfig } from '@/services/item-editor-service';
import { canShowColumn, hideFields } from '@/services/post-service';
import { TableItemEditorProps } from '@/types/item-editor';
import AutoFormFiles from '../auto-form/fields/files';
import { DependencyType } from '../auto-form/types';
import AutoFormComplete from '../auto-form/fields/auto-complete';



const PostEditor = ({ item, method, onClose }: TableItemEditorProps) => {

    const { onSubmit, handleDelete, formSchema: rawFormSchema } = useTableItemEditor({ item, tableName: 'post', method, onClose });


    return (<>
        <h1 className="text-2xl font-bold">Editar informações de {item.title}</h1>
        <AutoForm
            /* @ts-ignore */
            formSchema={rawFormSchema}
            className="space-y-4"
            values={item}
            dependencies={hideFields(['user', 'contentHtml'])}
            onSubmit={onSubmit}
            fieldConfig={{
                published: { label: 'Publicado', fieldType: 'checkbox' },
                title: { label: 'Título' },
                content: { label: 'Conteúdo', fieldType: MarkdownEditor },
                categories: {
                    label: 'Categorias do post',
                    fieldType: AutoFormComplete,
                    inputProps: {
                        multiple: true,
                        type: 'BlogCategory',
                    },
                },
                images: {
                    label: 'Imagens',
                    inputProps: {
                        className: 'max-w-xs',
                        accept: "image/*",
                        multiple: true,
                    },
                    fieldType: AutoFormFiles,
                },
            }}
        >

            <div className="sticky -bottom-8 bg-neutral-200 p-4 w-full flex justify-end">

                {item &&
                    <Button
                        id="step-delete"
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white mr-2"
                        onClick={handleDelete}>Remover Item</Button>
                }
                <AutoFormSubmit className='mr-2 w-40'>
                    Salvar
                </AutoFormSubmit>


            </div>
        </AutoForm>
    </>

    );
};

export default PostEditor;
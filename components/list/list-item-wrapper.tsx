import { CrudRequest } from '@/pages/api/protected/crud';
import { Dialog } from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import AddButton from '../button/AddButton';
import Drawer from '../drawer/drawer';
import { useToast } from '../providers/toast-provider';
import { DialogContent } from '../ui/dialog';

export interface OnSubmitProps {
    item: any;
    method: CrudRequest["method"];
}

export interface ListItemWrapperProps {
    children: any;
    clickArea?: any;
    onSubmit: (props: OnSubmitProps) => void;
    disableClickArea?: boolean;
    variant?: 'modal' | 'drawer';
}

/**
 * @file TableItemWrapper.tsx
 * @description Componente para criar um modal ou drawer com um formulário para adicionar ou editar um item.
 * 
 * Propriedades:
 *   - children: o conteúdo do modal ou drawer
 *   - clickArea: o elemento que será clicável para abrir o modal ou drawer
 *   - onSubmit: a função que será chamada quando o formulário for submetido
 *   - disableClickArea: se o clickArea for definido, esse atributo pode ser usado para desabilitar o clique no clickArea
 *   - variant: o tipo de modal ou drawer a ser criado. Pode ser 'modal' ou 'drawer'
 *   
 */

export default function TableItemWrapper({ children, onSubmit, clickArea, disableClickArea, variant = 'drawer' }: { children: any, clickArea?: any, onSubmit?: any, disableClickArea?: boolean, variant?: 'modal' | 'drawer' }) {
    const [isOpen, setIsOpen] = useState(false);

    const notify = useToast()

    const toggleMenu = () => {
        if (disableClickArea) {
            return
        }
        setIsOpen(!isOpen);
    };

    const Wrapper = ({ children }: { children: any }) => {

        return variant === 'modal' ? (
            <Dialog open={isOpen} onOpenChange={toggleMenu}>

                <DialogContent className="bg-neutral-100">
                    {children}
                </DialogContent>
            </Dialog>

        ) : (
            <Drawer
                className="p-4 min-w-[100dvw] md:min-w-[450px]"
                anchor={'right'}
                isOpen={isOpen}
                onClose={toggleMenu}
            > <AddButton toggleMenu={toggleMenu} isOpen={isOpen} />
                {children}
            </Drawer>
        )
    }


    const handleSave = async (props: OnSubmitProps) => {
        if (typeof onSubmit === 'function') {
            try {
                await onSubmit(props);
                if (props.item?.error) {
                    notify((props as any)!.item?.error/* 'Não foi possível efetuar as mudanças' */, { type: 'error', })
                } else switch (props?.method) {
                    case 'create':
                        notify('Novo Item Adicionado', { type: 'success' })
                        break;
                    case 'update':
                        notify('Alterações Concluídas', { type: 'success' })
                        break;
                    case 'delete':
                        notify('Item Removido', { type: 'info' })
                        break;

                }
            } catch (error) {
                notify((error as any)/* 'Não foi possível efetuar as mudanças' */, { type: 'error' })
            }
        }
        toggleMenu();
    };

    return (
        <React.Fragment>
            {
                clickArea ?
                    React.cloneElement(clickArea, { onClick: toggleMenu })
                    :
                    <AddButton toggleMenu={() => !isOpen && toggleMenu()} isOpen={isOpen} />
            }
            <Wrapper>
                {React.cloneElement(children, { onClose: handleSave })}
            </Wrapper>
        </React.Fragment >
    );
}

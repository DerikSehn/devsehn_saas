import { CrudRequest } from '@/pages/api/crud';
import { Dialog } from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import AddButton from '../button/AddButton';
import Drawer from '../drawer/drawer';
import { useToast } from '../providers/toast-provider';
import { DialogTrigger, DialogContent, DialogPortal, DialogOverlay } from '../ui/dialog';

/*  import { useToast } from '../Providers/ToastProvider';
 */
export default function TableItemWrapper({ children, onSubmit = () => { }, clickArea, disableClickArea, variant = 'drawer' }: { children: any, clickArea?: any, onSubmit: any, disableClickArea?: boolean, variant?: 'modal' | 'drawer' }) {
    const [isOpen, setIsOpen] = useState(false);

    const notify = useToast()

    const toggleMenu = () => {
        console.log(isOpen)
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
                className="p-4 min-w-[450px] w-350dvw]"
                anchor={'right'}
                isOpen={isOpen}
                onClose={toggleMenu}
            > <AddButton toggleMenu={toggleMenu} isOpen={isOpen} />
                {children}
            </Drawer>
        )
    }


    const handleSave = async (props: { item: any, method: CrudRequest["method"] }) => {
        try {
            await onSubmit(props.item, props.method);
            toggleMenu();
            if (props.item.error) {
                notify('Não foi possível efetuar as mudanças', { type: 'error' })
            } else switch (props.method) {
                case 'create':
                    notify('Novo Item Adicionado', { type: 'success' })
                    break;
                case 'update':
                    notify('Alterações Concluídas', { type: 'success' })
                    break;
                case 'delete':
                    notify('Item Removido', { type: 'success' })
                    break;

            }
        } catch (error) {
            notify('Não foi possível efetuar as mudanças', { type: 'error' })
        }
    };

    return (
        <div>
            {
                clickArea ?
                    React.cloneElement(clickArea, { onClick: toggleMenu })
                    :
                    <AddButton toggleMenu={() => !isOpen && toggleMenu()} isOpen={isOpen} />
            }
            <Wrapper>
                {React.cloneElement(children, { onClose: handleSave })}
            </Wrapper>
        </div>
    );
}

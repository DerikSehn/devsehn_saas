
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ConfirmDialog({ children, onConfirm, title, message, confirmTitle = 'Confirmar', cancelTitle = 'Cancelar' }: { children: any, onConfirm: any, title: string, message: string, confirmTitle?: string, cancelTitle?: string }) {
    const handleConfirm = () => {
        onConfirm()
    }
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-neutral-100">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelTitle}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>{confirmTitle}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
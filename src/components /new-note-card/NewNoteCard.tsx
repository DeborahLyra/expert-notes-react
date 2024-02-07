import * as Dialog from "@radix-ui/react-dialog" //pega tudo o que tem na biblioteca e coloca em "dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { ToastT, toast } from "sonner"

function NewNoteCard() {

    const [shouldShowOnBording, setShouldShowOnBording] = useState(true);
    const [content, setContent] = useState('')

    const handleStartEditor = () => setShouldShowOnBording(false)

    //const handleClose = () => setShouldShowOnBording(true)

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)

        if (event.target.value === '') {
            setShouldShowOnBording(true)
        }
    }

    const handleSaveNOte = (event: FormEvent) => {
        event.preventDefault()

        console.log(content)

        toast.success("Nota adicionada com sucesso")
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 text-left gap-3 outline-none hover:ring-slate-600 focus:ring-2 focus:ring-lime-400">
                <span className="text-sm font-medium text-slate-200">
                    Adicionar nota
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    Grave um texto em áudio que será convertido automaticamente
                </p>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none">
                    <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                        <X className="size-5" />
                    </Dialog.Close>

                    <form onSubmit={handleSaveNOte} className="flex flex-col flex-1">
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className="text-sm font-medium text-slate-300">
                                Adicionar nota
                            </span>

                            {shouldShowOnBording ? (
                                <p className="text-sm leading-6 text-slate-400">
                                    Comece <button className="text-lime-400 font-medium hover:underline">gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} className="text-lime-400 font-medium hover:underline">utilize apenas texto</button>
                                </p>
                            ) : (
                                <textarea
                                    autoFocus
                                    className="text-sm text-slate-400 leading-6 bg-transparent resize-none flex-1 outline-none"
                                    onChange={handleContentChange}
                                />
                            )
                            }
                        </div>

                        <button className="w-full bg-lime-400 py-4 text-center text-slate-950 outline-none font-medium hover:bg-lime-500">
                            Salvar nota
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default NewNoteCard

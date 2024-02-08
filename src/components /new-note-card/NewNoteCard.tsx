import * as Dialog from "@radix-ui/react-dialog" //pega tudo o que tem na biblioteca e coloca em "dialog"
import { AlertTriangle, X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { ToastT, toast } from "sonner"


interface OnNoteCreated {
    onNoteCreated: (content: string) => void
}

function NewNoteCard({ onNoteCreated }: OnNoteCreated) {

    const [shouldShowOnBording, setShouldShowOnBording] = useState(true);
    const [isRecording, setIsRecording] = useState(false)
    const [content, setContent] = useState('')

    let speechRecognition : SpeechRecognition | null = null 

    const handleStartEditor = () => setShouldShowOnBording(false)

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)

        if (event.target.value === '') {
            setShouldShowOnBording(true)
        }
    }

    const handleSaveNOte = (event: FormEvent) => {
        event.preventDefault()

        if (content === '') {
            return
        }

        onNoteCreated(content) //chama a função criada na interface

        setContent('')

        setShouldShowOnBording(true)

        toast.success("Nota adicionada com sucesso")
    }

    const handleStartRecording = () => {

        const isSpeechRecongnitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

        if (!isSpeechRecongnitionAPIAvailable) {
            alert('Ops, infelizmente o seu navegador não suporta')
            return
        }

        setIsRecording(true)
        setShouldShowOnBording(false)

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

       speechRecognition = new SpeechRecognitionAPI()

        speechRecognition.lang = 'pt-BR';
        speechRecognition.continuous = true;
        speechRecognition.maxAlternatives = 1;
        speechRecognition.interimResults = true;

        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            }, '')

            setContent(transcription)
        }

        speechRecognition.onerror = (event) => {
            console.log(event)
        }

        speechRecognition.start()
    }

    const handleStopRecording = () => {
        setIsRecording(false)

        if(speechRecognition !== null){
            speechRecognition.stop()
        }
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

                    <form className="flex flex-col flex-1">
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className="text-sm font-medium text-slate-300">
                                Adicionar nota
                            </span>

                            {shouldShowOnBording ? (
                                <p className="text-sm leading-6 text-slate-400">
                                    Comece <button type="button" onClick={handleStartRecording} className="text-lime-400 font-medium hover:underline">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className="text-lime-400 font-medium hover:underline">utilize apenas texto</button>
                                </p>
                            ) : (
                                <textarea
                                    autoFocus
                                    className="text-sm text-slate-400 leading-6 bg-transparent resize-none flex-1 outline-none"
                                    onChange={handleContentChange}
                                    value={content}
                                />
                            )
                            }
                        </div>

                        {isRecording ? (
                            <button onClick={handleStopRecording} type="button" className="w-full bg-slate-900 py-4 text-center flex items-center justify-center gap-2 text-slate-300 outline-none font-medium hover:text-slate-100">
                                <div className="size-3 bg-red-500 rounded-full animate-pulse" />
                                Gravando (clique para interromper)
                            </button>
                        ) : (
                            <button onClick={handleSaveNOte} type="button" className="w-full bg-lime-400 py-4 text-center text-slate-950 outline-none font-medium hover:bg-lime-500">
                                Salvar nota
                            </button>
                        )
                        }

                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default NewNoteCard

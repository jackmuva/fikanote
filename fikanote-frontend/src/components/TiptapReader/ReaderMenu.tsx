import { Editor } from "@tiptap/react";

export const ReaderMenu = ({ editor }: { editor: Editor | null }) => {
	const saveHtml = async () => {
		const rawHtml = editor?.getHTML();
		var file = new Blob([rawHtml ?? ""], { type: "text/html" });
		const handle = await showSaveFilePicker({ suggestedName: "fikanote-file.html" });
		const writer = await handle.createWritable();
		await writer.write(file);
		await writer.close();
	}

	function download() {
		const rawHtml = editor?.getHTML();
		const file = new File([rawHtml ?? ""], 'fikanote.html', { type: 'text/html' })
		const link = document.createElement('a')
		const url = URL.createObjectURL(file)
		link.href = url
		link.download = file.name
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		window.URL.revokeObjectURL(url)
	}

	const redirectToHome = () => {
		window.location.href = '/'
	}

	return (
		<div className='bg-white z-10 py-2 px-2 rounded-lg 
				 mt-8 border-2 shadow-xl flex h-16'>
			{editor != null &&
				<div className='flex flex-row items-center justify-between w-full'>
					<div className='flex space-x-2 flex-wrap gap-y-1'>
						<button className={'border-2 font-bold border-stone-300 text-sm hover:bg-purple-100 hover:border-purple-700'}
							onClick={redirectToHome}>
							Write your own FikaNote
						</button>
					</div>
					<div className='flex flex-col w-24 space-y-0 border-l-2 px-2 ml-2 border-stone-100'>
						<button onClick={saveHtml}
							className='hidden md:block py-1 px-0 rounded-none border-b-1 border-b-stone-200 bg-inherit hover:-translate-y-0.5 text-xs font-bold'>
							Save File
						</button>
						<button onClick={download}
							className='md:hidden py-1 px-0 rounded-none border-b-1 border-b-stone-200 bg-inherit hover:-translate-y-0.5 text-xs font-bold'>
							Save File
						</button>
					</div>
				</div>}
		</div>

	)
}

import { Editor } from '@tiptap/react'
import { useRef } from 'react';

export const TiptapMenu = ({ editor }: { editor: Editor | null }) => {

	const inputFile = useRef<HTMLInputElement | null>(null);

	const uploadFile = () => {
		inputFile.current?.click();
	}

	const handleFile = (event: any) => {
		const file = event.target.files[0];
		const fileReader = new FileReader();

		fileReader.readAsDataURL(file)
		fileReader.onload = () => {
			editor?.chain().insertContentAt(editor.state.selection.anchor, {
				type: 'image',
				attrs: {
					src: fileReader.result,
				},
			}).focus().run()
		}
	}

	const sendDocument = () => { };
	const redirectToAccount = () => { };

	return (
		<div className='bg-white z-10 py-2 px-2 rounded-lg 
				 sticky top-10 border-2 shadow-xl flex'>
			{editor != null &&
				<div className='flex flex-row items-center justify-between w-full'>
					<div className='flex space-x-2 flex-wrap space-y-2'>
						<button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
							className={editor.isActive('heading', { level: 1 }) ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;h1&gt;
						</button>
						<button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
							className={editor.isActive('heading', { level: 2 }) ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;h2&gt;
						</button>
						<button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
							className={editor.isActive('heading', { level: 3 }) ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;h3&gt;
						</button>
						<button onClick={() => editor.chain().focus().toggleBulletList().run()}
							className={editor.isActive('bulletList') ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;ul&gt;
						</button>
						<button onClick={editor.isActive('codeBlock') ? () => editor.chain().focus().toggleCodeBlock().run() :
							() => editor.chain().focus().setCodeBlock().run()}
							className={editor.isActive('codeBlock') ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;code&gt;
						</button>
						<input type="file" id="file" style={{ display: 'none' }} ref={inputFile} accept="image/*" onChange={handleFile} />
						<button onClick={uploadFile}
							className='border-2 border-stone-300 text-sm'> &lt;img&gt;
						</button>
					</div>
					<div className='flex flex-col w-32 space-y-1 border-l-2 px-2 ml-2 border-stone-100'>
						<button onClick={sendDocument}
							className='border-2 border-stone-300 p-1 bg-amber-100 hover:bg-amber-300 hover:-translate-y-0.5 text-xs font-bold'>
							Send Page
						</button>
						<button onClick={sendDocument}
							className='border-2 border-stone-300 p-1 bg-orange-100 hover:bg-orange-300 hover:-translate-y-0.5 text-xs font-bold'>
							Save Page
						</button>

						<button onClick={redirectToAccount}
							className='border-2 border-stone-300 p-1 bg-green-100 hover:bg-green-300 hover:-translate-y-0.5 text-xs font-bold'>
							Account
						</button>
					</div>
				</div>}
		</div>
	);
};

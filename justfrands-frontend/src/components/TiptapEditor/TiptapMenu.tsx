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

	return (
		<div className='bg-white z-10 py-2 px-2 rounded-lg 
				 sticky top-20 border-2 shadow-xl'>
			{editor != null &&
				<div className='flex space-x-2'>
					<button
						onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						className={editor.isActive('heading', { level: 1 }) ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						&lt;h1&gt;
					</button>
					<button
						onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						className={editor.isActive('heading', { level: 2 }) ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						&lt;h2&gt;
					</button>
					<button
						onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
						className={editor.isActive('heading', { level: 3 }) ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						&lt;h3&gt;
					</button>

					<button
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={editor.isActive('bulletList') ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						&lt;ul&gt;
					</button>
					<button
						onClick={editor.isActive('codeBlock') ? () => editor.chain().focus().toggleCodeBlock().run()
							: () => editor.chain().focus().setCodeBlock().run()}
						className={editor.isActive('codeBlock') ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						&lt;code&gt;
					</button>
					<input type="file" id="file" style={{ display: 'none' }} ref={inputFile} accept="image/*" onChange={handleFile} />
					<button onClick={uploadFile}> &lt;img&gt; </button>
				</div>}
		</div>
	);
};

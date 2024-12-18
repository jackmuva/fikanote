import { Editor } from '@tiptap/react'

export const TiptapMenu = ({ editor }: { editor: Editor | null }) => {

	return (
		<div className='bg-white z-10 py-2 px-2 rounded-lg 
				 sticky top-20 border-2 shadow-xl'>
			{editor != null &&
				<div className='flex space-x-2'>
					<button
						onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						className={editor.isActive('heading', { level: 1 }) ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						H1
					</button>
					<button
						onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						className={editor.isActive('heading', { level: 2 }) ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						H2
					</button>
					<button
						onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
						className={editor.isActive('heading', { level: 3 }) ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						H3
					</button>

					<button
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={editor.isActive('bulletList') ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						list
					</button>
					<button
						onClick={editor.isActive('codeBlock') ? () => editor.chain().focus().toggleCodeBlock().run()
							: () => editor.chain().focus().setCodeBlock().run()}
						className={editor.isActive('codeBlock') ? 'font-bold bg-purple-100 border-2 border-purple-700' : ''}
					>
						code
					</button>
				</div>}
		</div>
	);
};

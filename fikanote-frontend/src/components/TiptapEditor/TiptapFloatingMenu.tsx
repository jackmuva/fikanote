import { Editor, FloatingMenu } from '@tiptap/react'


export const TiptapFloatingMenu = ({ editor }: { editor: Editor }) => {
	return (
		<div>
			< FloatingMenu editor={editor} className='bg-white z-10 py-2 px-2 rounded-lg 
				flex space-x-2 '>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
				>
					H1
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
				>
					H2
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'is-active' : ''}
				>
					list
				</button>
			</FloatingMenu>
		</div>
	);
};

import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";

export const TiptapBubbleMenu = ({ editor }: { editor: Editor | null }) => {

	return (
		<div>
			{editor !== null &&
				<BubbleMenu className="rounded-lg bg-white p-2 shadow-xl border-2 space-x-2" editor={editor}>
					<button
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={editor.isActive('bold') ? 'border-2 border-purple-700 bg-purple-100 font-bold' : ''}
					>
						Bold
					</button>
					<button
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={editor.isActive('italic') ? 'border-2 border-purple-700 bg-purple-100 font-bold' : ''}
					>
						Italic
					</button>
				</BubbleMenu>
			}
		</div>
	);
};

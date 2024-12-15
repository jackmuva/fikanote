import { useEditor, EditorContent } from '@tiptap/react'
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import { TiptapMenu } from './TiptapMenu';
import { TiptapBubbleMenu } from './TiptapBubbleMenu';

// define your extension array
const extensions = [StarterKit, Document, Paragraph, Heading.configure({ levels: [1, 2, 3] }),
	Text, Image, Youtube, BulletList, ListItem, CodeBlock];

const content = `<h2>Start Typing to Begin</h2>`


const TiptapEditor = () => {
	const editor = useEditor({
		extensions,
		content,
		editorProps: {
			attributes: {
				class: 'focus:outline-none',
			},
		}
	});

	return (
		<div className={"w-full h-full text-left text-black "}>
			<TiptapMenu editor={editor}></TiptapMenu>
			<EditorContent className='bg-stone-100 p-4 rounded-lg mt-8' editor={editor} />
			<TiptapBubbleMenu editor={editor} />
		</div>
	);
}

export default TiptapEditor;

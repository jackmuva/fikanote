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
import { TiptapFloatingMenu } from './TiptapFloatingMenu';

// define your extension array
const extensions = [StarterKit, Document, Paragraph, Heading.configure({ levels: [1, 2, 3] }),
	Text, Image, Youtube, BulletList, ListItem, CodeBlock];

const content = `<p>Hello World!</p>
	<h1>heading</h1>
	<h2>heading2</h2>
	<ul>
		<li>1</li>
		<li>2</li>
	</ul>`

const TiptapEditor = () => {
	const editor = useEditor({
		extensions,
		content,
	})

	return (
		<div className={"w-full h-full bg-stone-100 text-left text-black p-4 rounded-lg"}>
			<EditorContent editor={editor} />
			<TiptapFloatingMenu editor={editor}></TiptapFloatingMenu>
			{/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
		</div>
	);
}

export default TiptapEditor;

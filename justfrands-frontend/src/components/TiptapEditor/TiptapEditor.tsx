import { useEditor, EditorContent } from '@tiptap/react'
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import { TiptapMenu } from './TiptapMenu';
import { TiptapBubbleMenu } from './TiptapBubbleMenu';
import FileHandler from '@tiptap-pro/extension-file-handler';
import { all, createLowlight } from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { useEffect } from 'react';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import ImageResize from 'tiptap-extension-resize-image';

const lowlight = createLowlight(all);

// define your extension array
export const extensions = [Document, Paragraph, Text, Youtube, BulletList, ListItem, Bold, Italic, ImageResize,
	Image.configure({
		allowBase64: true,
		inline: true
	}),
	Heading.configure({ levels: [1, 2, 3] }),
	FileHandler.configure({
		allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
		onDrop: (currentEditor, files, pos) => {
			files.forEach(file => {
				const fileReader = new FileReader()

				fileReader.readAsDataURL(file)
				fileReader.onload = () => {
					currentEditor.chain().insertContentAt(pos, {
						type: 'image',
						attrs: {
							src: fileReader.result,
						},
					}).focus().run()
				}
			})
		},
		onPaste: (currentEditor, files, htmlContent) => {
			files.forEach(file => {
				if (htmlContent) {
					// if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
					// you could extract the pasted file from this url string and upload it to a server for example
					return false
				}

				const fileReader = new FileReader()

				fileReader.readAsDataURL(file)
				fileReader.onload = () => {
					currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
						type: 'image',
						attrs: {
							src: fileReader.result,
						},
					}).focus().run()
				}
			})
		},
	}),
	CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'ts' })
];


const TiptapEditor = () => {
	const content = `<h2>Start Typing to Begin</h2>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>`
	const editor = useEditor({
		extensions,
		content,
		editorProps: {
			attributes: {
				class: 'focus:outline-none',
			},
		},
		onUpdate({ editor }) {
			localStorage.setItem("content", editor.getHTML());
		},
	});

	useEffect(() => {
		if (localStorage.getItem("content")) {
			const savedContent = localStorage.getItem("content") ?? content;
			editor?.commands.setContent(savedContent);
		}
	}, []);

	return (
		<div className={"w-full h-full text-left text-black "}>
			<TiptapMenu editor={editor}></TiptapMenu>
			<EditorContent className='bg-stone-100 p-4 rounded-lg mt-8 h-fit min-h-96' editor={editor} />
			<TiptapBubbleMenu editor={editor} />
		</div>
	);
}

export default TiptapEditor;

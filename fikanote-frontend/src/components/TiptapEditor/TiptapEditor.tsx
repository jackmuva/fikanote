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
import { common, createLowlight } from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { useEffect } from 'react';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import ImageResize from 'tiptap-extension-resize-image';
import Link from '@tiptap/extension-link'
import History from '@tiptap/extension-history'

const lowlight = createLowlight(common);

// define your extension array
export const extensions = [Document, Paragraph, Text, Youtube, BulletList, ListItem, Bold, Italic, ImageResize, History,
	Link.configure({
		openOnClick: true,
		autolink: true,
		defaultProtocol: 'https',
		protocols: ['http', 'https'],
		isAllowedUri: (url, ctx) => {
			try {
				// construct URL
				const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

				// use default validation
				if (!ctx.defaultValidate(parsedUrl.href)) {
					return false
				}

				// disallowed protocols
				const disallowedProtocols = ['ftp', 'file', 'mailto']
				const protocol = parsedUrl.protocol.replace(':', '')

				if (disallowedProtocols.includes(protocol)) {
					return false
				}

				// only allow protocols specified in ctx.protocols
				const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

				if (!allowedProtocols.includes(protocol)) {
					return false
				}

				// disallowed domains
				const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
				const domain = parsedUrl.hostname

				if (disallowedDomains.includes(domain)) {
					return false
				}

				// all checks have passed
				return true
			} catch {
				return false
			}
		},
		shouldAutoLink: url => {
			try {
				const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
				const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
				const domain = parsedUrl.hostname

				return !disallowedDomains.includes(domain)
			} catch {
				return false
			}
		},

	}),
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
	CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'typescript' })
];


const TiptapEditor = () => {
	const content = `<h2>Welcome to FikaNote</h2>
			<ul>
			<li>FikaNote is a lightweight app to write notes, letters, and pages</li>
					<li>Your page is auto-saved locally on your browser </li>
					<ul><li>Clearing your browser data will clear your page</li></ul>
					<li>To save your work, <b>Save File</b> and <b>Open File</b> to pick up where you left off</li>
				<li><b>Send Page</b> will generate a URL that you can send to others a <b>read-only</b> version of your page</li>
			</ul>
			<h3>Clear this page when you're ready to start</h3>
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

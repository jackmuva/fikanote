import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { extensions } from "../TiptapEditor/TiptapEditor";
import { ReaderMenu } from "./ReaderMenu";

export const TiptapReader = ({ docId }: { docId: string }) => {
	const content = "<p> Loading... </p>";
	const editor = useEditor({
		extensions,
		content,
		editable: false,

	});

	useEffect(() => {
		getContent();
	}, [editor]);

	const getContent = async () => {
		if (!editor) console.log('not initialized');
		const response = await fetch(import.meta.env.VITE_BACKEND + "/api/get-url/" + docId, {
			method: "GET"
		});
		const body = await response.json();
		editor?.commands.setContent(body.html);
	}


	return (
		<div className={"w-full h-full text-left text-black "}>
			<EditorContent className='bg-stone-100 p-4 rounded-lg mt-8 h-fit min-h-96' editor={editor} />
			<ReaderMenu editor={editor} />
		</div>
	);
};

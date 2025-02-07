import { Editor } from "@tiptap/react";
import { common } from 'lowlight';

export const CodeBlockModal = ({ editor }: { editor: Editor | null }) => {
	const setBlock = (lang: string) => {
		editor?.chain().focus().setCodeBlock({ language: lang }).run()
	}

	const langs = Object.keys(common).map((lang) => {
		return (
			<div className="overflow-x-clip hover:bg-zinc-600 text-blue-200 text-[11px]"
				onClick={() => setBlock(lang)}>
				{lang}
			</div>
		)
	});
	return (
		<div className="border-2 bg-neutral-100 absolute rounded-lg shadow-md 
			h-80 space-y-1 translate-y-7 w-20 -translate-x-4 flex flex-col font-bold text-sm justify-center items-center">
			<div>Language:</div>
			<div className="w-11/12 h-72 rounded-md bg-zinc-900 overflow-y-auto">
				{langs}
			</div>
		</div>
	);
}

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Editor } from "@tiptap/react";

export const SendUrlModal = ({ toggle, editor }: { toggle: () => void, editor: Editor }) => {
	const [modalState, setModalState] = useState<{ loading: boolean, url: string }>({ loading: true, url: "" });

	useEffect(() => {
		sendDocument().then((url: string) => {
			setModalState({ url: url, loading: false });
		});
	}, []);

	function isValidHttpUrl(str: string) {
		let url;

		try {
			url = new URL(str);
		} catch (_) {
			return false;
		}

		return url.protocol === "http:" || url.protocol === "https:";
	}

	const convertImages = async (html: string | undefined, docId: string) => {
		if (html === undefined) {
			return;
		}

		const regex = /<img[^>]+src=["']([^"']+)["']/g;
		const srcList: string[] = [];
		let match: RegExpExecArray | null;
		let resultHtml = html;

		while ((match = regex.exec(html)) !== null) {
			srcList.push(match[1]);
		}

		for (const base64 of srcList) {
			if (!isValidHttpUrl(base64)) {
				const imageUrl = await saveImageToUrl(base64, docId);
				resultHtml = resultHtml.replace(base64, imageUrl);
			}
		}
		return resultHtml;
	}

	const saveImageToUrl = async (base64: string, docId: string): Promise<string> => {
		const imgId = uuidv4();
		const formData = new FormData();
		formData.append("base64", base64);
		formData.append("imgId", imgId);
		formData.append("docId", docId);
		const response = await fetch(import.meta.env.VITE_BACKEND + "/api/save-image", {
			method: "POST",
			body: formData,
		});
		const body = await response.json();
		return body.location;
	}

	const sendDocument = async () => {
		const id = uuidv4();
		const imgOptimizedHtml = await convertImages(editor?.getHTML(), id);
		const generatedUrl = window.location.href + "doc/" + id;
		const response = await fetch(import.meta.env.VITE_BACKEND + "/api/generate-url", {
			method: "POST",
			body: JSON.stringify({ url: generatedUrl, html: imgOptimizedHtml }),
			headers: { 'Content-Type': 'application/json' }
		});
		const body = await response.json();
		return body.url;
	};


	const copy = () => {
		navigator.clipboard.writeText(modalState.url);
		const url = modalState.url;
		setModalState((prev) => ({ ...prev, url: "copied" }));
		setTimeout(() => setModalState((prev) => ({ ...prev, url: url })), 3000);
	}

	return (
		<div className="border-2 bg-neutral-100 absolute rounded-lg shadow-md right-24 w-64 flex items-center space-x-1">
			<button className={"text-sm bg-transparent p-1 m-2"} onClick={toggle}>
				X
			</button>
			{modalState.loading &&
				<div>
					<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current 
						border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
						role="status">
						<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
							Loading...
						</span>
					</div>
				</div>
			}
			{modalState.loading === false &&
				<>
					<div className="flex items-center space-x-1">
						<button className={"bg-stone-300 border-1 border-stone-300 p-1"} onClick={() => { copy() }}>
							<svg fill="#000000" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Text-files"> <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"></path> <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"></path> <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"></path> <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"></path> <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"></path> </g> </g></svg>
						</button>
						<input type="text" value={modalState.url} readOnly
							className={modalState.url !== "copied" ? "text-sm w-[170px] p-1 bg-white rounded-md border-2" : "border-2 border-indigo-800 text-sm text-gray-500 font-semibold w-min p-1 bg-green-100 rounded-md "} />
					</div>
				</>
			}
		</div >
	);
}

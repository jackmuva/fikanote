import { TiptapReader } from "../components/TiptapReader/TiptapReader";
import { useParams } from "react-router";

export const ReaderPage = () => {

  let { docId } = useParams();

  return (
    <div className="w-11/12 md:w-1/2 flex justify-center h-fit ">
      <TiptapReader docId={docId ?? ""} />
    </div>
  );
}

import { memo } from "react";
import DocumentEditor from "./DocumentEditor";

const RichText = () => {
  return (
    <div className="flex justify-center">
      <DocumentEditor />
    </div>
  );
};

export default memo(RichText);

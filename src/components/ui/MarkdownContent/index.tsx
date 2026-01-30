import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parser } from "rich-editor-to-markdown-parser";
import styles from "./styles.module.css";

type MarkdownContentProps = {
  content: string;
};

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className={styles.markdown}>
      <ReactMarkDown remarkPlugins={[remarkGfm]}>
        {parser(content)}
      </ReactMarkDown>
    </div>
  );
}

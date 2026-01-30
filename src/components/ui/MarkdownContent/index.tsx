import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parser } from "rich-editor-to-markdown-parser";
import styles from "./styles.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import type { HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";

type MarkdownContentProps = {
  content: string;
};

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className={styles.markdown}>
      <ReactMarkDown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props: HTMLAttributes<HTMLElement> & ExtraProps) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                PreTag="code"
                language={match[1]}
                style={atomOneDark}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {parser(content)}
      </ReactMarkDown>
    </div>
  );
}

import Image from "next/image";
import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import ReactMarkDown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import { parser } from "rich-editor-to-markdown-parser";
import styles from "./styles.module.css";

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
          img(props: ImgHTMLAttributes<HTMLImageElement> & ExtraProps) {
            const { src, alt, width, height, ...rest } = props;
            // 空のsrcは描画しない
            if (!src || typeof src !== "string") {
              return null;
            }
            return (
              <Image
                src={src}
                alt={alt || ""}
                width={typeof width === "number" ? width : 800}
                height={typeof height === "number" ? height : 600}
              />
            );
          },
        }}
      >
        {parser(content)}
      </ReactMarkDown>
    </div>
  );
}

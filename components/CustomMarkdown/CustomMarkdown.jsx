import { useContext } from 'react';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ThemeContext from '../../contexts/ThemeContext';

export default function CustomMarkdown({
  children, className, containerClassName,
}) {
  const { isDark } = useContext(ThemeContext);
  // this components will convert img from markdown to next/image component
  // https://amirardalan.com/blog/use-next-image-with-react-markdown
  const MarkdownComponents = {
    p: (paragraph) => {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        const alt = image.properties.alt?.replace(/ *\{[^)]*\} */g, '');
        const isPriority = image.properties.alt?.toLowerCase().includes('{priority}');
        const metaWidth = image.properties.alt.match(/{([^}]+)x/);
        const metaHeight = image.properties.alt.match(/x([^}]+)}/);
        const width = metaWidth ? metaWidth[1] : '768';
        const height = metaHeight ? metaHeight[1] : '432';

        return (
          containerClassName ? (
            <div className={containerClassName}>
              <Image
                src={image.properties.src}
                width={width}
                height={height}
                alt={alt}
                priority={isPriority}
                layout="responsive"
                sizes="(min-width: 992px) 992px, 100vw"
              />
            </div>
          ) : (
            <Image
              src={image.properties.src}
              width={width}
              height={height}
              alt={alt}
              priority={isPriority}
            />
          )
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code: (props) => {
      const match = /language-(\w+)/.exec(props.className || '');
      return !props.inline && match ? (
        <SyntaxHighlighter
          style={isDark ? dracula : solarizedlight}
          language={match[1]}
          PreTag="div"
          wrapLongLines
        >
          {String(props.children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={props.className}>
          {props.children}
        </code>
      );
    },
  };

  return (
    <Markdown
      components={MarkdownComponents}
      className={className}
    >
      {children}
    </Markdown>
  );
}

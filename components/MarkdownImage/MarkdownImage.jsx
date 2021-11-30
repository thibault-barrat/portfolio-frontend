import Image from 'next/image';
import Markdown from 'react-markdown';

export default function MarkdownImage({ children, className, containerClassName }) {
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

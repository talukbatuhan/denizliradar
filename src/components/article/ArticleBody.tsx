type ArticleBodyProps = {
  paragraphs: string[];
};

export function ArticleBody({ paragraphs }: ArticleBodyProps) {
  return (
    <div className="prose prose-lg max-w-none font-serif prose-headings:font-serif prose-p:text-foreground/90 prose-p:leading-relaxed">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

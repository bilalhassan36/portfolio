interface Props {
  content: {
    titleSimple: string;
    titleHighlight: string;
    supportingText?: string | null;
  };
}

const PageHero = ({ content }: Props) => {
  return (
    <div className="mb-10 flex cursor-default flex-col items-center gap-3 text-center">
      <h2 className="text-foreground text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        {content.titleSimple}{" "}
        <span className="text-brand">{content.titleHighlight}</span>
      </h2>

      <p className="text-clay mx-auto max-w-lg text-sm leading-relaxed sm:text-base md:text-lg">
        {content.supportingText}
      </p>
    </div>
  );
};

export default PageHero;

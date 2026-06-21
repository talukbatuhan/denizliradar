type JsonLdValue = Record<string, unknown>;

type JsonLdProps = {
  data: JsonLdValue | JsonLdValue[];
};

function serializeJsonLd(data: JsonLdValue | JsonLdValue[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

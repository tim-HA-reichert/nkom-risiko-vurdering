//nedprioriterte dette litt, men ville gjøre det ferdig likevel.

type ListBlock = {
    list: string[];
};

type LinksBlock = {
    links: {
        label: string;
        url: string;
    }[];
};

type ContentBlock = string | ListBlock | LinksBlock;

interface ResultsPageProps {
    title: string;
    pageContent: ContentBlock[];
}

export default function ResultsPage({title, pageContent}: Readonly<ResultsPageProps>) {
    return (
        <div className="flex flex-col items-start gap-4">
            <h1 className="text-3xl font-bold">{title}</h1>

            {pageContent.map((block, index) => {
                if (typeof block === "string") {
                    return <p key={index}>
                        {block}
                    </p>;
                }

                if ("list" in block) {
                    return (
                        <ul key={index} className="flex flex-col items-start list-disc pl-6">
                            {block.list.map((item, i) => (
                                <li key={i}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    );
                }

                // Links
                if ("links" in block) {
                    return (
                        <div key={index} className="flex items-start flex-col gap-2">
                            {block.links.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className=" underline text-blue-400 hover:text-blue-800"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
}
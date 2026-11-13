import { useEffect } from "react";

const BASE_URL = "https://suzerain-save-editor.vercel.app";

interface DocumentMetaOptions {
	title: string;
	description: string;
	canonicalPath: string;
}

const setMetaContent = (selector: string, content: string): void => {
	const element = document.querySelector<HTMLMetaElement>(selector);
	if (element) {
		element.setAttribute("content", content);
	}
};

export const useDocumentMeta = ({ title, description, canonicalPath }: DocumentMetaOptions): void => {
	useEffect(() => {
		const canonicalUrl = `${BASE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;

		document.title = title;
		setMetaContent('meta[name="description"]', description);
		setMetaContent('meta[property="og:title"]', title);
		setMetaContent('meta[property="og:description"]', description);
		setMetaContent('meta[property="og:url"]', canonicalUrl);
		setMetaContent('meta[name="twitter:title"]', title);
		setMetaContent('meta[name="twitter:description"]', description);
		setMetaContent('meta[name="twitter:url"]', canonicalUrl);

		const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		if (canonicalLink) {
			canonicalLink.setAttribute("href", canonicalUrl);
		}
	}, [title, description, canonicalPath]);
};

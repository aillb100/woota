const StringUtil = () => {
    const stripTag = (oldStr: string) => {
        return oldStr.replace(/<([^>]*)>?/g, '');
    };

    const unescape = (oldStr: string) => {
        return oldStr.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");
    };

    return {
        stripTag,
        unescape
    }
};

const su = StringUtil();
export {
    su
};
export const handlePageData = <T = unknown>(data: [T[], number]) => {
    return {
        content: data[0],
        total: data[1],
    };
};

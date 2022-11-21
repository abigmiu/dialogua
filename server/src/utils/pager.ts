export const handlePageData = (data: [unknown[], number]) => {
    return {
        content: data[0],
        total: data[1],
    };
};

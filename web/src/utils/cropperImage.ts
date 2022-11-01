
/** 裁剪图片 */
export function cropperBookCover(file: File): Promise<File> {
    const blob = new Blob([file]);
    const blobLink = window.URL.createObjectURL(blob);

    const img = new Image();
    return new Promise((resolve, reject) => {
        img.onload = async () => {
            window.URL.revokeObjectURL(blobLink);

            try {
                const file = await cut(img);
                resolve(file);
            } catch {
                reject('裁剪封面图失败')
            }
        }
        img.src = blobLink;
    })
}

function cut(img: HTMLImageElement): Promise<File> {
    const { width, height } = img

    const unit = height / 3;
    const acceptWidth = unit * 2;
    const sliceX = (width - acceptWidth) / 2;

    const canvas = document.createElement('canvas');
    canvas.width = acceptWidth;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(img, sliceX, 0, acceptWidth, height, 0, 0, acceptWidth, height)

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                 return reject('图片这 blob 失败')
            }
            const file = new File([blob], 'bookCover.jpeg', {
                type: 'image/jpeg',
            })
            resolve(file);
        }, 'image/jpeg');
    })
}
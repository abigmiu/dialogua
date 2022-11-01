
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

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
}

function getContrastYIQ(hexColor: string) {
    if (hexColor.startsWith('#')) {
        hexColor = hexColor.slice(1);
    }

    var r = parseInt(hexColor.slice(0, 2), 16);
    var g = parseInt(hexColor.slice(2, 2), 16);
    var b = parseInt(hexColor.slice(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

/** canvas 竖排文本换行 */
function fillTextVertical(ctx: CanvasRenderingContext2D, title: string) {
    let x = 110, y = 30;
    const letterSpacing = 5;
    ctx.font = "bold 30px serif";
    const textAry = title.split('');
    textAry.forEach((word) => {
        if (y > 190) {
            x = x - 35;
            y = 30;
        }
        if (word.match(/[A-Za-z0-9]/)) { // 非汉字 旋转
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 180 * 90);
            ctx.textBaseline = 'bottom';
            ctx.fillText(word, 0, 0);
            ctx.restore();
            y += ctx.measureText(word).width + letterSpacing; // 计算文字宽度
        } else if (word.match(/[\u4E00-\u9FA5]/)) {
            ctx.save();
            ctx.textBaseline = 'top';
            ctx.fillText(word, x, y);
            ctx.restore();
            y += ctx.measureText(word).width + letterSpacing; // 计算文字宽度
        }
    })
}

export function generateBookWordCover(title: string): Promise<File> | void {
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    const color = randomColor();
    console.log(color);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const textColor = getContrastYIQ(color);
    ctx.fillStyle = textColor;
    fillTextVertical(ctx, title);

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                return reject('图片转 blob 失败')
            }
            const file = new File([blob], 'bookCover.jpeg', {
                type: 'image/jpeg',
            })
            resolve(file);
        }, 'image/jpeg');
    })
}
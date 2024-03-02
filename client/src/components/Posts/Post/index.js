export const downloadFile = async(imgFile) => {
    try {
        const base64File = imgFile;
        
        const mime = base64File.split(';')[0].split(':')[1];
        const base64Data = base64File.split(',')[1];
    
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: mime });

        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'downloaded.jpg'); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch(error) {
        console.log("Error Downloading", error);
    }
}

export const resizeImage = (base64Str, maxWidth, maxHeight, quality, callback) => {
    var img = new Image();
    img.src = base64Str;
    img.onload = function() {
        var width = img.width;
        var height = img.height;

        var newWidth = width;
        var newHeight = height;

        if (width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (height * maxWidth) / width;
        }
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (width * maxHeight) / height;
        }

        var canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        var resizedBase64 = canvas.toDataURL('image/jpg', quality); 

        callback(resizedBase64);
    };
}



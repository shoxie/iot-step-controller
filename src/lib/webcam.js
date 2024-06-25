const NodeWebcam = require('node-webcam');
const Jimp = require('jimp');
const QrCode = require('qrcode-reader');

// Configure the webcam
const webcamOptions = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: false,
    output: 'jpeg',
    device: false,
    callbackReturn: 'buffer',
    verbose: false
};

const Webcam = NodeWebcam.create(webcamOptions);

// Function to capture an image and read QR code
function scanQRCode() {
    Webcam.capture("test_picture", function(err, data) {
        if (err) {
            return console.error("Error capturing image: ", err);
        }

        // Use Jimp to read the image
        Jimp.read(data, (err, image) => {
            if (err) {
                return console.error("Error reading image: ", err);
            }

            // Prepare QR code reader
            const qr = new QrCode();
            qr.callback = (err, value) => {
                if (err) {
                    console.error("Error reading QR code: ", err);
                } else {
                    console.log("QR Code detected: ", value.result);
                }
            };

            // Decode QR code
            qr.decode(image.bitmap);
        });
    });
}

// Call the function to scan QR code
scanQRCode();

import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "productImages/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const uplode = multer({ storage });
export default uplode;
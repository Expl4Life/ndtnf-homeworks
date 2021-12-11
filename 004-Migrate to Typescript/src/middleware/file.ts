import multer from 'multer';

const storage = multer.diskStorage({
    destination(req: any, file: any, cb: any) {
        cb(null, 'public/img')
    },
    filename(req: any, file: any, cb: any) {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
});

const allowedTypes: string [] = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req: any, file: any, cb: any): void => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

export default multer({
    storage,
    fileFilter
});

import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';
// const { cloudinary } = require('./utils/cloudinary');
import cloudinary from '../utils/cloudinary.js';
const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },  
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

// const upload = multer({ storage });

// uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

uploadRouter.get('/api/images', async (req, res) => {
  const { resources } = await cloudinary.search
      .expression('folder:dev_setups')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});
uploadRouter.post('/api/upload', async (req, res) => {
  try {
      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'dev_setups',
      });
      console.log(uploadResponse);
      res.json({ msg: 'yaya' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
  }
});

export default uploadRouter;

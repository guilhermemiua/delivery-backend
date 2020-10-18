const shortid = require('shortid');
const path = require('path');
const {
  Company,
  User,
  Product,
  ProductImage,
  ProfileImage,
} = require('../models');
const { saveImage } = require('../helpers');

class ImageUploadController {
  async uploadCompanyImage(request, response) {
    try {
      const id = shortid.generate();
      const file = await saveImage(
        request.file.path,
        path.join(
          process.cwd(),
          `public/uploads/${id}${path.extname(request.file.originalname)}`,
        ),
        request.file.originalname,
        id,
      );

      if (file) {
        const profileImage = await ProfileImage.create({
          name: `${id}${path.extname(request.file.originalname)}`,
          path: file,
        });

        await Company.update(
          {
            profile_image_id: profileImage.id,
          },
          {
            where: {
              id: Number(request.companyId),
            },
          },
        );

        return response.status(200).json(profileImage);
      }

      return response.status(400);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async uploadUserImage(request, response) {
    try {
      const id = shortid.generate();
      const file = await saveImage(
        request.file.path,
        path.join(
          process.cwd(),
          `./public/uploads/${id}${path.extname(request.file.originalname)}`,
        ),
        request.file.originalName,
      );

      if (file) {
        const profileImage = await ProfileImage.create({
          name: `${id}${path.extname(request.file.originalname)}`,
          path: file,
        });

        await User.update(
          {
            profile_image_id: profileImage.id,
          },
          {
            where: {
              id: Number(request.userId),
            },
          },
        );

        return response.status(200).json(profileImage);
      }

      return response.status(400);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async uploadProductImage(request, response) {
    const { productId } = request.body;
    try {
      const id = shortid.generate();
      const file = await saveImage(
        request.file.path,
        path.join(
          process.cwd(),
          `./public/uploads/${id}${path.extname(request.file.originalname)}`,
        ),
        request.file.originalName,
      );

      if (file) {
        const productImage = await ProductImage.create({
          name: `${id}${path.extname(request.file.originalname)}`,
          path: file,
        });

        await Product.update(
          {
            product_image_id: productImage.id,
          },
          {
            where: {
              id: Number(productId),
            },
          },
        );

        return response.status(200).json(productImage);
      }

      return response.status(400);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = new ImageUploadController();

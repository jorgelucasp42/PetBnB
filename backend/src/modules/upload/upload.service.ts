import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { createHash } from 'crypto';

// Configure o cloudinary (geralmente feito na inicialização da aplicação)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class UploadService {
  async uploadImage(
    base64Image: string,
    userId: string,
    type: 'prestador' | 'cliente' | 'pet',
    petName?: string,
  ): Promise<string> {
    const matches = base64Image.match(/^data:(.+);base64,(.*)$/);
    const imageData = matches ? matches[2] : base64Image;

    let uniqueIdentifier = createHash('md5').update(userId).digest('hex');
    if (type === 'pet' && petName) {
      const petNameHash = createHash('md5').update(petName).digest('hex');
      uniqueIdentifier = `${uniqueIdentifier}-${petNameHash}`;
    }

    try {
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageData}`,
        {
          public_id: `${type}/${uniqueIdentifier}-${Date.now()}`,
          overwrite: true,
        },
      );
      return result.secure_url;
    } catch (error) {
      console.error('Erro no upload para o Cloudinary:', error);
      throw error;
    }
  }

  async removeImage(photoUrl: string): Promise<void> {
    if (!photoUrl) return;

    // Utiliza regex para extrair o public_id da URL
    const publicIdMatch = photoUrl.match(/\/upload\/(?:v\d+\/)?(.*)\.[a-z]+$/);

    if (publicIdMatch && publicIdMatch[1]) {
      console.log('cloudinary: ', publicIdMatch[1]);
      const publicId = publicIdMatch[1];
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error('Erro ao deletar a imagem do Cloudinary:', error);
      }
    }
  }
  async uploadGalleryImage(
    base64Image: string,
    userId: string,
    userType: 'prestador' | 'cliente',
  ): Promise<string> {
    const matches = base64Image.match(/^data:(.+);base64,(.*)$/);
    const imageData = matches ? matches[2] : base64Image;
    const hashedId = createHash('md5').update(userId).digest('hex');

    try {
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageData}`,
        {
          public_id: `${userType}/gallery/${hashedId}-${Date.now()}`,
          overwrite: true,
        },
      );
      return result.secure_url;
    } catch (error) {
      console.error('Erro no upload para o Cloudinary:', error);
      throw error;
    }
  }
}

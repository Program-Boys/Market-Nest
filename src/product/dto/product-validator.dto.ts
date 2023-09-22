import axios from 'axios';
import {
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'urlSize', async: true })
export class UrlSizeValidator implements ValidatorConstraintInterface {
  async validate(url: string, args: ValidationArguments): Promise<boolean> {
    try {
      const response = await axios.head(url);
      const imgSize = response.headers['content-length'];
      const sizeInBytes = parseInt(imgSize, 10);
      const maxSize = 10 * 1024 * 1024;

      return sizeInBytes <= maxSize;
    } catch (err) {
      return false;
    }
  }
  defaultMessage(args: ValidationArguments): string {
    return 'URL size exceeds 10MB';
  }
}

import { HttpException } from '@nestjs/common';
import * as cpfLib from 'node-cpf';

const validateCpf = (cpf: string): string => {
  if (cpfLib.validate(cpf)) {
    return cpfLib.mask(cpf);
  } else {
    throw new HttpException('CPF Invalid', 400);
  }
};

export default validateCpf;

import { Controller, Version } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'api/v1'
})
export class BaseV1Controller {
  constructor() {}
}

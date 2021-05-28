import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap(): Promise<unknown> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.init()
  return app.getHttpAdapter().getInstance()
}

export default bootstrap

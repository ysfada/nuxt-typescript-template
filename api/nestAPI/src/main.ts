import { Logger } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.listen(3333)
  logger.log(`NestJS server running on ${await app.getUrl()}`)
}
bootstrap()

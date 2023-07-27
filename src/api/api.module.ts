import { Module } from "@nestjs/common";
import { ApiService } from "./api.service";
import { ApiController } from "./api.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
    providers: [ApiService, PrismaService],
    controllers: [ApiController],
})
export class ApiModule {}

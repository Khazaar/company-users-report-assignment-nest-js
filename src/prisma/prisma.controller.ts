import { Controller, Delete, Post } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Controller("prisma")
export class PrismaController {
    constructor(private prismaService: PrismaService) {}
    @Post()
    async seedDatabase() {
        return await this.prismaService.seedDatabase();
    }
    @Delete()
    async clearDb() {
        return await this.prismaService.clearDb();
    }
}

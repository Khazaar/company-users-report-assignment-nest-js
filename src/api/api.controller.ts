import {
    Body,
    Controller,
    Get,
    ParseBoolPipe,
    ParseIntPipe,
    Query,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApiService } from "./api.service";

@Controller("api")
export class ApiController {
    constructor(
        private prismaService: PrismaService,
        private apiService: ApiService,
    ) {}
    @Get("reportTransactionsSpecific")
    async reportTransactionsSpecific(
        @Query("companyId", ParseIntPipe) companyId,
        @Query("startDate") startDate,
        @Query("endDate") endDate,
        @Query("showZeroTransactions", ParseBoolPipe) showZeroTransactions,
    ) {
        return await this.apiService.reportTransactionsSpecific(
            companyId,
            new Date(startDate),
            new Date(endDate),
            showZeroTransactions,
        );
    }
}

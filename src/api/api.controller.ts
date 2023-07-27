import {
    Body,
    Controller,
    Get,
    ParseBoolPipe,
    ParseIntPipe,
    Query,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ApiService } from "./api.service";
import { ApiQuery } from "@nestjs/swagger";

@Controller("api")
export class ApiController {
    constructor(
        private prismaService: PrismaService,
        private apiService: ApiService,
    ) {}
    @Get("reportTransactionsSpecific")
    @ApiQuery({
        name: "companyId",
        required: true,
        type: Number,
        description: "ID of the company",
    })
    @ApiQuery({
        name: "startDate",
        required: true,
        type: String,
        description: "Start date",
    })
    @ApiQuery({
        name: "endDate",
        required: true,
        type: String,
        description: "End date",
    })
    @ApiQuery({
        name: "showZeroTransactions",
        required: true,
        type: Boolean,
        description: "Show zero transactions flag",
    })
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

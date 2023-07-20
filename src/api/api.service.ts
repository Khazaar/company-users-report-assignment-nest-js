import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

type ReportEntityDto = {
    userId: number;
    userFullName: string;
    lardLastDigits: string;
    cardTotal: number;
};

@Injectable()
export class ApiService {
    constructor(private prismaService: PrismaService) {}
    async reportTransactionsSpecific(
        companyId: number,
        startDate: Date,
        endDate: Date,
        showZeroTransactions: boolean,
    ) {
        const report: ReportEntityDto[] = [];
        const cards = await this.prismaService.prismaClient.moneyCard.findMany({
            where: {
                companyId: companyId,
            },
        });
        for (let card of cards) {
            const user = await this.prismaService.prismaClient.user.findFirst({
                where: {
                    id: card.userId,
                },
            });

            const bankStansactions =
                await this.prismaService.prismaClient.bankTransaction.findMany({
                    where: {
                        orderTime: {
                            lte: endDate,
                            gte: startDate,
                        },
                        cardId: card.id,
                    },
                });
            const cardTotal = bankStansactions.reduce(
                (sum, tr) => (sum += tr.value),
                0,
            );

            const reportEntity: ReportEntityDto = {
                userId: card.userId,
                userFullName: user.fullName,
                lardLastDigits: card.lastDigits,
                cardTotal: cardTotal,
            };
            (showZeroTransactions || cardTotal != 0) &&
                report.push(reportEntity);
        }
        return report;
    }
}

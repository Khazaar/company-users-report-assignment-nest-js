import { Injectable } from "@nestjs/common";
import {
    PrismaClient,
    MoneyCard,
    User,
    Company,
    BankTransaction,
} from "@prisma/client";
import * as casual from "casual";

// Define custom generators
casual.define("card_pin", function () {
    return Math.floor(1000 + Math.random() * 9000).toString();
});

casual.define("card_last_four", function () {
    return Math.floor(1000 + Math.random() * 9000).toString();
});

@Injectable()
export class PrismaService {
    public prismaClient: PrismaClient;
    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async seedDatabase() {
        for (let i = 0; i < 10; i++) {
            // Create user
            const user: User = await this.prismaClient.user.create({
                data: {
                    identification: casual.uuid,
                    lastName: casual.last_name,
                    firstName: casual.first_name,
                    passord: casual.password,
                    cellphone: casual.phone,
                    email: casual.email,
                    fullName: casual.full_name,
                },
            });

            // Create company
            const company: Company = await this.prismaClient.company.create({
                data: {
                    name: casual.company_name,
                },
            });

            // Create moneyCard
            const moneyCard1: MoneyCard =
                await this.prismaClient.moneyCard.create({
                    data: {
                        name: casual.card_type,
                        password: casual.password,
                        pin: casual["card_pin"],
                        lastDigits: casual["card_last_four"],
                        userId: user.id,
                        companyId: company.id,
                    },
                });
            const moneyCard2: MoneyCard =
                await this.prismaClient.moneyCard.create({
                    data: {
                        name: casual.card_type,
                        password: casual.password,
                        pin: casual["card_pin"],
                        lastDigits: casual["card_last_four"],
                        userId: user.id,
                        companyId: company.id,
                    },
                });

            // Create bankTransaction
            for (let j = 0; j < 5; j++) {
                const bankTransaction =
                    await this.prismaClient.bankTransaction.createMany({
                        data: [
                            {
                                value: casual.double(0, 10000),
                                orderTime: this.randomDate(
                                    2010,
                                    2012,
                                ).toISOString(),
                                remarks: casual.sentence,
                                cardId: moneyCard1.id,
                            },
                            {
                                value: casual.double(0, 10000),
                                orderTime: this.randomDate(
                                    2010,
                                    2012,
                                ).toISOString(),
                                remarks: casual.sentence,
                                cardId: moneyCard2.id,
                            },
                        ],
                    });
            }
        }
        return "Data inited";
    }

    // helper function to generate random date between two years
    randomDate(startYear: number, endYear: number) {
        const start = new Date(startYear, 0, 1); // start of startYear
        const end = new Date(endYear, 11, 31); // end of endYear
        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime()),
        );
    }

    async clearDb() {
        await this.prismaClient.bankTransaction.deleteMany();
        await this.prismaClient.moneyCard.deleteMany();
        await this.prismaClient.user.deleteMany();
        await this.prismaClient.company.deleteMany();
        return "DB cleared";
    }
}

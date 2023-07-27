import { Test, TestingModule } from "@nestjs/testing";
import { ApiService } from "./api.service";
import { PrismaService } from "../prisma/prisma.service";

describe("ApiService", () => {
    let service: ApiService;

    const mockPrismaService = {
        prismaClient: {
            moneyCard: {
                findMany: jest.fn(),
            },
            user: {
                findFirst: jest.fn(),
            },
            bankTransaction: {
                findMany: jest.fn(),
            },
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ApiService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get<ApiService>(ApiService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("reportTransactionsSpecific", () => {
        it("should return correct report", async () => {
            // Arrange
            const companyId = 1;
            const startDate = new Date("2023-01-01");
            const endDate = new Date("2023-12-31");
            const showZeroTransactions = false;

            const cardMock = [
                {
                    id: 1,
                    name: "card1",
                    password: "password1",
                    pin: "1234",
                    lastDigits: "5678",
                    userId: 1,
                    companyId: companyId,
                },
                // ... more card mocks
            ];

            const userMock = {
                id: 1,
                identification: "id1",
                lastName: "Doe",
                firstName: "John",
                password: "password1",
                cellphone: "123456789",
                email: "john.doe@example.com",
                fullName: "John Doe",
            };

            const transactionsMock = [
                {
                    id: 1,
                    value: 50.5,
                    orderTime: new Date("2023-06-01"),
                    remarks: "transaction1",
                    cardId: 1,
                },
                {
                    id: 2,
                    value: 50.0,
                    orderTime: new Date("2023-07-01"),
                    remarks: "transaction2",
                    cardId: 1,
                },
                // ... more transactions mocks
            ];

            mockPrismaService.prismaClient.moneyCard.findMany.mockResolvedValue(
                cardMock,
            );
            mockPrismaService.prismaClient.user.findFirst.mockResolvedValue(
                userMock,
            );
            mockPrismaService.prismaClient.bankTransaction.findMany.mockResolvedValue(
                transactionsMock,
            );
            const expectedReport = [
                {
                    userId: 1,
                    userFullName: "John Doe",
                    lardLastDigits: "5678",
                    cardTotal: 100.5,
                },
                // ... more expected report entities
            ];

            // Action
            const report = await service.reportTransactionsSpecific(
                companyId,
                startDate,
                endDate,
                showZeroTransactions,
            );

            // Assertion
            // Assert that report is as expected. Replace `expectedReport` with the expected report.
            expect(report).toEqual(expectedReport);
        });
    });
});

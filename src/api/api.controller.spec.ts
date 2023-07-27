import { Test, TestingModule } from "@nestjs/testing";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";
import { PrismaService } from "../prisma/prisma.service";

describe("ApiController", () => {
    let controller: ApiController;

    // mock for ApiService
    const mockApiService = {
        reportTransactionsSpecific: jest
            .fn()
            .mockImplementation(() => Promise.resolve("success")),
    };

    // mock for PrismaService
    const mockPrismaService = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ApiController],
            providers: [
                { provide: ApiService, useValue: mockApiService },
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        controller = module.get<ApiController>(ApiController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("reportTransactionsSpecific should return success", async () => {
        const result = await controller.reportTransactionsSpecific(
            1,
            "2023-07-21",
            "2023-07-22",
            false,
        );
        expect(result).toBe("success");
    });
});

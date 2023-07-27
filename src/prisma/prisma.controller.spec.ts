import { Test, TestingModule } from "@nestjs/testing";
import { PrismaController } from "./prisma.controller";
import { PrismaService } from "./prisma.service";

describe("PrismaController", () => {
    let controller: PrismaController;
    const mockPrismaService = {
        seedDatabase: jest
            .fn()
            .mockImplementation(() => Promise.resolve("Data inited")),
        clearDb: jest
            .fn()
            .mockImplementation(() => Promise.resolve("DB cleared")),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PrismaController],
            providers: [
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        controller = module.get<PrismaController>(PrismaController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
    it("should init DB", async () => {
        const result = await controller.clearDb();
        expect(result).toBe("DB cleared");
    });
    it("should clear DB", async () => {
        const result = await controller.seedDatabase();
        expect(result).toBe("Data inited");
    });
});

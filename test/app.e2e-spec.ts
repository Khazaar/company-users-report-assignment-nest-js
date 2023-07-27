import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import * as pactum from "pactum";

describe("AppController (e2e)", () => {
    let app: INestApplication;
    let server: any;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        server = app.getHttpServer();
        await app.init();
        await app.listen(3000);
    });

    it("/ (GET)", async () => {
        await pactum
            .spec()
            .get("http://localhost:3000/")
            .expectStatus(200)
            .expectBody("Hello World!");
    });

    it("Init DB", async () => {
        await pactum
            .spec()
            .post("http://localhost:3000/prisma")
            .expectStatus(201)
            .expectBody("Data inited");
    });

    it("Clear DB", async () => {
        await pactum
            .spec()
            .delete("http://localhost:3000/prisma")
            .expectStatus(200)
            .expectBody("DB cleared");
    });

    afterAll(async () => {
        await app.close();
    });
});

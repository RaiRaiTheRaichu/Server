/* eslint-disable @typescript-eslint/naming-convention */
import "reflect-metadata";
import { container } from "tsyringe";
import { vi, beforeAll, afterEach, describe, expect, it } from "vitest";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { PlayerService } from "@spt-aki/services/PlayerService";

describe("PlayerService", () =>
{
    let playerService: PlayerService; // Using "any" to access private/protected methods without type errors.

    beforeAll(() =>
    {
        playerService = container.resolve<PlayerService>("PlayerService");
    });

    afterEach(() =>
    {
        vi.restoreAllMocks();
    });

    describe("calculateLevel", () =>
    {
        it("should return 1 when player xp is 999", () =>
        {
            const playerProfile = {
                Info: {
                    Experience: 999 // Via wiki: https://escapefromtarkov.fandom.com/wiki/Character_skills#Levels
                }
            };

            const result = playerService.calculateLevel(playerProfile as IPmcData);

            expect(result).toBe(1);
        });

        it("should return 25 when player xp is 609,066", () =>
        {
            const playerProfile = {
                Info: {
                    Experience: 609066 // Via wiki: https://escapefromtarkov.fandom.com/wiki/Character_skills#Levels
                }
            };

            const result = playerService.calculateLevel(playerProfile as IPmcData);

            expect(result).toBe(25);
        });

        it("should return 79 when player xp is 68,206,066", () =>
        {
            const playerProfile = {
                Info: {
                    Experience: 68206066 // Via wiki: https://escapefromtarkov.fandom.com/wiki/Character_skills#Levels
                }
            };

            const result = playerService.calculateLevel(playerProfile as IPmcData);

            expect(result).toBe(79);
        });
    });
});

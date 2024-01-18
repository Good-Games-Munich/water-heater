import { assignPools } from '../utils/seeding.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
    // Method to generate seeded groups
    public generateSeededGroups(numberOfGroups: number, seededList: string[]): string[] {
        return assignPools(seededList, numberOfGroups);
    }
}

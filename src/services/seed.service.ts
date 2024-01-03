import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
    // Method to generate seeded groups
    public generateSeededGroups(numberOfGroups: number, seededList: string[]): string[] {
        const groups: string[][] = Array.from({ length: numberOfGroups }, () => []);
        const filler = 'bye';

        // Distribute items from the seededList into the groups
        seededList.forEach((item, index) => {
            groups[index % numberOfGroups].push(item);
        });

        // Fill in any empty spots in the groups with the filler value
        const maxLength = Math.max(...groups.map(group => group.length));
        const result = groups.flatMap(group => {
            if (numberOfGroups > 2 && group.length < maxLength) {
                const diff = maxLength - group.length;
                return group.concat(Array.from({ length: diff }, () => filler));
            }

            return group;
        });

        return result;
    }
}

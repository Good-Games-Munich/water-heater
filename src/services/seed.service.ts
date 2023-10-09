import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
    public generateSeededGroups(numberOfGroups: number, seededList: string[]): string[] {
        const groups: string[][] = Array.from({ length: numberOfGroups }, () => []);
        const filler = 'bye';

        seededList.forEach((item, index) => {
            groups[index % numberOfGroups].push(item);
        });

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

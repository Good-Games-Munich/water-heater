import { Injectable } from '@nestjs/common';

@Injectable()
export class PayoutService {
    public calculatePayout(amountToPayout: number): {
        fiftyPercent: number;
        remaining: number;
        thirtyPercent: number;
        twentyPercent: number;
    } {
        const fiftyPercent = Math.floor(amountToPayout * 0.5);
        const thirtyPercent = Math.floor(amountToPayout * 0.3);
        const twentyPercent = Math.floor(amountToPayout * 0.2);
        const remaining = amountToPayout - fiftyPercent - thirtyPercent - twentyPercent;

        return { fiftyPercent, thirtyPercent, twentyPercent, remaining };
    }
}

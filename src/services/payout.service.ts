import { Injectable } from '@nestjs/common';

@Injectable()
export class PayoutService {
    public calculatePayout(amountToPayout: number): {
        fiftyPercent: number;
        remaining: number;
        thirtyPercent: number;
        twentyPercent: number;
    } {
        const fiftyPercent = Math.round(amountToPayout * 0.5 * 100) / 100;
        const thirtyPercent = Math.round(amountToPayout * 0.3 * 100) / 100;
        const twentyPercent = Math.round(amountToPayout * 0.2 * 100) / 100;
        const remaining = amountToPayout - fiftyPercent - thirtyPercent - twentyPercent;

        return { fiftyPercent, thirtyPercent, twentyPercent, remaining };
    }
}

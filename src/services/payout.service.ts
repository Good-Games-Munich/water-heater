import { Injectable } from '@nestjs/common';

@Injectable()
export class PayoutService {
    // Method to calculate payout amounts
    public calculatePayout(amountToPayout: number): {
        fiftyPercent: number;
        remaining: number;
        thirtyPercent: number;
        twentyPercent: number;
    } {
        // Calculate the payout amounts
        const fiftyPercent = Math.floor(amountToPayout * 0.5 * 100) / 100;
        const thirtyPercent = Math.floor(amountToPayout * 0.3 * 100) / 100;
        const twentyPercent = Math.floor(amountToPayout * 0.2 * 100) / 100;

        // Calculate the remaining amount
        const remaining = amountToPayout - fiftyPercent - thirtyPercent - twentyPercent;

        return { fiftyPercent, thirtyPercent, twentyPercent, remaining };
    }
}

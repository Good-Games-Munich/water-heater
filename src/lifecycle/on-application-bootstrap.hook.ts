import { initTranslator } from '../i18n/translator';
import type { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OnApplicationBootstrapHook implements OnApplicationBootstrap {
    // Method to initialize the translator on application bootstrap
    public async onApplicationBootstrap() {
        await initTranslator();
    }
}

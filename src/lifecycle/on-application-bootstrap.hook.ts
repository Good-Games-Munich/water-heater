import { initTranslator } from '../i18n/translator';
import { Injectable, type OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class OnApplicationBootstrapHook implements OnApplicationBootstrap {
    // Method to initialize the translator on application bootstrap
    public async onApplicationBootstrap() {
        await initTranslator();
    }
}

import { initTranslator } from '../i18n/translator';
import type { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OnApplicationBootstrapHook implements OnApplicationBootstrap {
    public async onApplicationBootstrap() {
        await initTranslator();
    }
}

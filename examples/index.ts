import { Application } from '../src/Index';
import './assets/css/main.scss';



/**
 * this is example
 */
export class Examples {
    /**
     * main function
     */
    public async main() {
        const app = new Application();
        app.output('Hello Wrold!');

    }
}


new Examples().main();
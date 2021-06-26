/**
 * 
 */
export class Application {


    public constructor() {
        // dds
    }


    /**
     * main
     * @param args urls parameters
     */
    public main(args: Record<string, any> = {}): void {
        console.log(new Date().format('yyyy-MM-dd hh:mm:ss'));
        console.log(args);
    }

}
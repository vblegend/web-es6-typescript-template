import { Application } from '@app/Application';
/* styles */
import '@assets/css/main.scss';
/* fonts && icons */
import '@assets/fonts/graceicon.scss';
import '@assets/fonts/molesk.scss';
/* extends */
import '@src/assets/js/type.extends.js';

/* boot */
new Application().main(window.getUrlVariables());
import Ally from './ally';
import Commands from './commands';
import { Page } from 'playwright';

class App {
  ally: Ally;
  ui: Commands;

  constructor(page: Page) {
    this.ally = new Ally();
    this.ui = new Commands(page);
  }
}

export default App;
